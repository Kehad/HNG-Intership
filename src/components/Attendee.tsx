import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useRef,
} from "react";
import { Mail } from "lucide-react";
import { CloudDownload } from "lucide-react";

interface AttendeeProps {
  setAttendeeData: (data: {
    name: string;
    email: string;
    about: string;
    imageUrl: string;
  }) => void;
}

const Attendee: React.FC<AttendeeProps> = ({ setAttendeeData }) => {
  const STORAGE_KEY = "attendeeFormData";
 
  const initialFormState = {
    name: "",
    email: "",
    about: "",
    imageUrl: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    about: "",
    imageUrl: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Validate the structure of saved data
        if (
          typeof parsedData === "object" &&
          "name" in parsedData &&
          "email" in parsedData &&
          "about" in parsedData
        ) {
          console.log(parsedData);

          // Set form data without imageUrl
          const { imageUrl, ...rest } = parsedData;
          setFormData(rest);
        }
      }
    } catch (error) {
      console.error("Error loading form data from localStorage:", error);
      // If there's an error, clear the corrupted data
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Save to localStorage whenever form data changes
  useEffect(() => {
    try {
      // Don't save if all fields are empty
      const isFormEmpty = Object.values(formData).every(
        (value) => value === ""
      );
      if (!isFormEmpty) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      }
    } catch (error) {
      console.error("Error saving form data to localStorage:", error);
    }
  }, [formData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = URL.createObjectURL(file);
        setFormData((prev) => ({
          ...prev,
          imageUrl: url,
        }));
  
      } catch (error) {
        console.error("Error creating object URL:", error);
        setErrors((prev) => ({
          ...prev,
          imageUrl: "Error uploading image",
        }));
      }
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", about: "", imageUrl: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.about.trim()) {
      newErrors.about = "About is required";
      valid = false;
    }
    console.log(formData.imageUrl);
    if (!formData.imageUrl) {
      newErrors.imageUrl = "Image is required";
      valid = false;
    }
    console.log(newErrors);
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setAttendeeData(formData);
      // Clear the form and localStorage after successful submission
      localStorage.removeItem(STORAGE_KEY);
      setFormData(initialFormState);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleBack = () => {
    // Optionally clear form data when going back
    if (
      window.confirm(
        "Are you sure you want to go back? Your form data will be saved."
      )
    ) {
      // Navigate back but keep the data in localStorage
      window.history.back();
    }
  };

  return (
    <div className="bg-[#041E23] max-w-l mx-auto rounded-xl p-4 backdrop-blur-lg border border-[#0E464F]">
      <div className="max-w-m mx-auto space-y-6">
        {/* Upload Section */}
        <div className="bg-[#052228] rounded-lg p-4">
          <div className="text-sm text-gray-300 mb-2">Upload Profile Photo</div>
          <div className=" rounded-lg p- w-full flex flex-col items-center justify-center md:bg-black/20">
            {!formData.imageUrl ? (
              <div className="flex  items-center p-3 h-40 justify-center w-1/2 bg-[#0E464F] border-2 border-[#24A0B5] rounded-xl  flex-col">
                <CloudDownload className="w-8 h-8 text-white mb-2" />
                {/* <p className="text-[12px] text-white">
                Drag & drop or click to upload
              </p> */}
                <input
                  type="file"
                  accept="image/*"
                  id="file"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="w-full mt-2  px-3 py-2 bg-transparent hidden border text-sm order-[#07373F] rounded-lg outline-none border-none focusborder-[#1E889A]"
                  tabIndex={0}
                />
                <label
                  htmlFor="file"
                  className="hfile-label text-[12px] text-white"
                >
                  Drag & drop or click to upload
                </label>
                {/* <span className="text-[10px] ">{fileName}</span> */}
                {errors.imageUrl && (
                  <p className="text-[#FF8D8D] text-xs mt-1">
                    {errors.imageUrl}
                  </p>
                )}
              </div>
            ) : (
              <div className="relative flex items-center justify-center w-1/2 h-40 bg-[#0E464F] border-2 border-[#24A0B5] rounded-xl flex-col overflow-hidden group">
                {/* Image Preview */}
                <img
                  src={formData.imageUrl}
                  alt="Uploaded Preview"
                  className="h-full w-full object-cover rounded-lg"
                />

                {/* Overlay Text (Hidden by default, appears on hover) */}
                <label
                  htmlFor="file"
                  className="absolute inset-0 flex items-center justify-center text-white text-[12px] bg-black/50 rounded-xl cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Drag & drop or click to upload
                </label>

                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*"
                  id="file"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                />

                {/* Error Message */}
                {errors.imageUrl && (
                  <p className="text-[#FF8D8D] text-xs mt-1">
                    {errors.imageUrl}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 text-white">
            {/* Name Input */}
            <div>
              <label className="block mb-1 text-sm">Enter your name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-transparent border text-sm border-[#07373F] rounded-lg outline-none focus:border-[#1E889A]"
                tabIndex={0}
              />
              {errors.name && (
                <p className="text-[#FF8D8D] text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Input with Icon */}
            <div>
              <label className="block mb-1 text-sm">Enter your email *</label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-[#24A0B5]"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 text-sm px-3 py-2 bg-transparent border border-[#07373F] rounded-lg outline-none focus:border-[#1E889A]"
                  placeholder="hello@avioflagos.io"
                  tabIndex={0}
                />
                {errors.email && (
                  <p className="text-[#FF8D8D] text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-400 mb-2">About the project</div>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Netiana"
              className="w-full h-25 bg-transparent border border-[#07373F] rounded-lg p-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#1E889A]"
              tabIndex={0}
            ></textarea>
            {errors.about && (
              <p className="text-[#FF8D8D] text-xs mt-1">{errors.about}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse md:flex-row gap-6 items-center justify-center w-full">
            <button
              type="button"
              onClick={handleBack}
              className="w-full px-4 py-2 border rounded-lg text-gray-300 border-[#24A0B5] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1E889A]"
              tabIndex={0}
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#1E889A] rounded-lg text-white hover:bg-[#1E889A]/20 focus:outline-none focus:ring-2 focus:ring-[#1E889A]"
              tabIndex={0}
            >
              Get My Free Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Attendee;
