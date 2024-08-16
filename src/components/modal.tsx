"use client";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { toPng } from "html-to-image";
import { createClient } from "../utils/supabase/client";
import { HashLoader } from "react-spinners";

function Modal({ isVisble, onClose, onUrlCreated }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  const [formContent, setFormContent] = useState({
    title: "",
    longUrl: "",
    customUrl: "",
  });

  const ref = useRef(null);

  const handleURLChange = (e) => {
    const { name, value } = e.target;

    // Clear error if longUrl is emptied
    if (name === "longUrl") {
      if (value === "") {
        setError("");
        setFormContent({ ...formContent, [name]: value });
        return;
      }

      // Check if the URL is valid
      if (!urlRegex.test(value)) {
        setError("Please enter a valid URL");
        setFormContent({ ...formContent, [name]: value });
        return;
      } else {
        setError("");
      }
    }

    // Update form content
    setFormContent({ ...formContent, [name]: value });
  };

  const handleModalClose = () => {
    setFormContent({ title: "", longUrl: "", customUrl: "" });
    setError("");
    setLoading(false);
    onClose();
  };

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleModalClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const CreateUrl = async (event) => {
    event.preventDefault();

    setLoading(true);
    const supabase = createClient(); // Initialize Supabase client
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      setError("User is not authenticated.");
      setLoading(false);
      return;
    }

    if (!formContent.longUrl || error) {
      setLoading(false);
      return;
    }

    try {
      // Convert the QRCode to a blob
      const node = ref.current;
      if (!node) {
        setError("QR code could not be generated. Please try again.");
        setLoading(false);
        return;
      }

      // Convert the QRCode to a PNG image
      const qrCodeBlob = await toPng(node);

      /* Create short URL with TinyURL API */
      const shortURL = await fetch("https://api.tinyurl.com/create/", {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer xXD5rMrbvVmDO4waTl4SeF1xiDjbiPCpaftWfKL2u1AriPSjcchIgJQbuesc`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: formContent.longUrl,
          domain: "tinyurl.com",
          description: "string",
        }),
      });

      if (!shortURL.ok) {
        console.error("Failed to shorten URL");
        return;
      }

      const shorturlData = await shortURL.json();

      const linkData = {
        tiny_url: shorturlData.data.tiny_url,
      };

      /* Updating the data base with the form content */
      const response = await fetch("/auth/createURLS", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          original_url: formContent.longUrl,
          short_url: linkData.tiny_url,
          user_id: user.id,
          title: formContent.title,
          qr_code: qrCodeBlob.split(",")[1],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setLoading(false);

      // Update the URLs in the parent component
      onUrlCreated(data[0]);

      handleModalClose();
    } catch (error) {
      setError("Failed to create URL");
    } finally {
      setLoading(false);
    }
  };

  if (!isVisble) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-25 z-40 backdrop-blur-sm flex flex-col justify-center items-center"
        id="wrapper"
      >
        <form className="md:w-[50%] lg:w-[30%] relative" onSubmit={CreateUrl}>
          <button
            className="bg-transparent absolute -right-1 -top-8"
            type="button"
            onClick={handleModalClose}
            aria-label="Close Modal"  // Added aria-label for accessibility
          >
            <IoIosCloseCircleOutline size={30} />
          </button>
          <div className="bg-white flex flex-col items-center p-5 rounded-xl shadow-lg ">
            <h1 className=" text-lg md:text-xl lg:text-2xl text-center font-semibold text-VeryDarkBlue">
              shorten a new link
            </h1>
            <div
              className="flex justify-center"
              style={{ width: "250px" }}
              ref={ref}
            >
              {formContent.longUrl && !error && (
                <QRCode value={formContent?.longUrl} size={250} />
              )}
            </div>
            <div className="flex flex-col gap-4 mt-5 w-full">
              <label htmlFor="title" className="text-sm -mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="w-full rounded-lg p-2"
                placeholder="Enter URL title here..."
                required
                onChange={handleURLChange}
                value={formContent.title}
              />
              <label htmlFor="longUrl" className="text-sm -mb-2">
                Long Link
              </label>
              <input
                type="text"
                name="longUrl"
                id="longUrl"
                className="w-full rounded-lg p-2"
                placeholder="long URL here..."
                required
                onChange={handleURLChange}
                value={formContent.longUrl}
              />
              <span className="text-Red">{error}</span>
              <label htmlFor="alias" className="text-sm -mb-2">
                Custom Alias
              </label>
              <input
                type="text"
                name="customUrl"
                id="customUrl"
                className="w-full rounded-lg p-2"
                placeholder="Custom Alias (Optional)..."
                onChange={handleURLChange}
                value={formContent.customUrl}
              />
              <button
                className="rounded-xl p-2 mt-4 flex justify-center items-center h-10"
                type="submit"
              >
                {loading ? (
                  <HashLoader size={20} color="#fff" />
                ) : (
                  "Shorten Link"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Modal;
