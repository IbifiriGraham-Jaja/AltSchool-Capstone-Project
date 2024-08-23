"use client";

import { FaRegCopy } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";
import Image from "next/image";
import Modal from "./modal";
import Loading from "./urlLoading";
import { useEffect, useState } from "react";
import LinkNotFound from "./linknotfound";
import Link from "next/link";
import UrlDetailsModal from "./getclicks";

export function DashboardShortener() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [urls, setUrls] = useState([]);
  const [search, setSearch] = useState<string>("");

  const handleAddUrl = (newUrl) => {
    setUrls((prevUrls) => [newUrl, ...prevUrls]);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="mt-7 flex flex-col">
      <div className="flex flex-col-reverse gap-2 md:flex-row md:justify-between mt-9 mb-2">
        <form className="md:w-4/5">
          <label htmlFor="search" className="sr-only">
            Search for a link
          </label>
          <input
            type="text"
            name="search"
            id="search"
            className="w-full"
            placeholder="Search for a link...."
            onChange={handleSearch}
          />
        </form>
        <button
          className="md:self-end rounded-xl px-4 py-2 mb-3"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Shorten Link
        </button>
      </div>
      <ShortenedComp urls={urls} setUrls={setUrls} search={search} />
      <Modal
        isVisble={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        onUrlCreated={handleAddUrl}
      />
    </div>
  );
}

function ShortenedComp({ urls, setUrls, search }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<number | null>(null);

  useEffect(() => {
    async function fetchUrls() {
      setLoading(true);

      try {
        const response = await fetch("./auth/getURLs");
        const data = await response.json();
        if (!data.error) {
          setUrls(data);
          setLoading(false);
        } else {
          console.error(data.error);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching URLs:", error);
        setLoading(false);
      }
    }

    fetchUrls();
  }, [setUrls]);

  if (loading) {
    return <Loading />;
  }

  if (urls.length === 0) {
    return (
      <div className="text-center text-VeryDarkBlue">
        <p>No URLs found. Start Now!</p>
      </div>
    );
  }

  const deleteURl = async (id: Number) => {
    try {
      const response = await fetch("./auth/deleteURLs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete URL");
      }

      setUrls((prevUrls) => prevUrls.filter((url) => url.id !== id));
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  const downloadQrCode = async (url) => {
    try {
      const response = await fetch(url.qr_code, {
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = `${url.title || "download"}.png`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading the QR code:", error);
    }
  };

  async function handleLinkClick(urlId, shortUrl) {
    try {
      // Send a POST request to record the click details
      const response = await fetch("/auth/storeClicks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: urlId }),
      });

      if (!response.ok) {
        console.error("Failed to record click");
      }

      // Open the shortened URL in a new tab
      window.open(shortUrl, "_blank");
    } catch (error) {
      console.error("Error handling link click:", error);
      window.open(shortUrl, "_blank"); // Still open the URL even if the API call fails
    }
  }

  const filteredUrls = urls.filter((url) =>
    search.toLowerCase() === ""
      ? url
      : url.title.toLowerCase().includes(search.toLowerCase()) ||
        url.short_url.toLowerCase().includes(search.toLowerCase()) ||
        url.original_url.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredUrls.length === 0) {
    return <LinkNotFound />;
  }

  return (
    <div className="mb-3 flex flex-col gap-4 justify-between bg-Gray">
      {filteredUrls.map((url) => (
        <article
          key={url.id}
          className="mb-3 flex flex-col md:flex-row justify-between w-full items-center bg-white rounded-xl shadow-lg p-5 "
        >
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex items-center">
              <Image
                src={`${url.qr_code}`}
                alt="qr code"
                width={100}
                height={100}
                priority={true}
                className="rounded-sm ring-2 ring-cyan"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-lg md:text-2xl lg:text-3xl">
                {url.title}
              </h2>
              <Link
                href={url.short_url}
                target="_blank"
                className="hover:underline md:text-lg lg:text-xl font-semibold text-LightGray hover:cursor-pointer"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default link behavior
                  handleLinkClick(url.id, url.short_url); // Call the function with the URL ID and short URL
                }}
              >
                Shortened URL: {url.short_url}
              </Link>
              <p className="hover:underline text-xs lg:text-sm">
                Original URL: {url.original_url}
              </p>

              <p className="text-xs self-start font-extralight mt-2">
                {new Date(url.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
            <button
              title="download QR code"
              className="bg-transparent p-2 rounded-full hover:bg-Gray"
              onClick={() => downloadQrCode(url)}
            >
              <MdOutlineFileDownload size={24} color="hsl(256, 26%, 33%)" />
            </button>
            <button
              title="Copy Short URL"
              className="bg-transparent p-2 rounded-full hover:bg-Gray"
              onClick={() => {
                navigator.clipboard.writeText(url.short_url);
                console.log(`Copied: ${url.short_url}`);
              }}
            >
              <FaRegCopy size={19} color="hsl(256, 26%, 33%)" />
            </button>
            <button
              title="Delete shortened URLs"
              className="bg-transparent p-2 rounded-full hover:bg-Gray"
              onClick={() => deleteURl(url.id)}
            >
              <MdDeleteOutline size={24} color="hsl(256, 26%, 33%)" />
            </button>
            <button
              title="View URL stats"
              className="rounded-full px-4 py-1"
              onClick={() => setShowDetails(url.id)}
            >
              details
            </button>
          </div>
          {showDetails === url.id && (
            <UrlDetailsModal
              isVisible={showDetails === url.id}
              onClose={() => setShowDetails(null)}
              urlId={url.id}
            />
          )}
        </article>
      ))}
    </div>
  );
}

export default ShortenedComp;