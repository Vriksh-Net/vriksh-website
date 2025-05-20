"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useItems } from "@/context/items-context";
import {
  InputField,
  TextAreaField,
  FileUploadField,
  FormSection,
  SubmitButton,
} from "@/components/ui/form-field";

export default function TeamForm() {
  const { addTeamMember } = useItems();
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
    imageUrl: "/placeholder.svg?height=200&width=200", // Default placeholder
    linkedin: "",
    twitter: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, you would upload the file to a server and get a URL back
      // For this demo, we'll just use a placeholder
      setFormData({
        ...formData,
        imageUrl: "/placeholder.svg?height=200&width=200",
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Add the team member to our context
    addTeamMember(formData);

    // Reset form after submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: "",
        designation: "",
        description: "",
        imageUrl: "/placeholder.svg?height=200&width=200",
        linkedin: "",
        twitter: "",
      });
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit}>
        <FormSection title="Add Team Member">
          <FileUploadField
            label="Profile Image"
            id="image"
            onChange={handleFileChange}
            required
            helperText="Upload a profile image (JPG, PNG, max 2MB)"
          />

          <InputField
            label="Name"
            id="name"
            placeholder="Enter team member's name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <InputField
            label="Designation"
            id="designation"
            placeholder="Enter designation/role"
            value={formData.designation}
            onChange={handleInputChange}
            required
          />

          <TextAreaField
            label="Description"
            id="description"
            placeholder="Enter description about the team member"
            value={formData.description}
            onChange={handleTextAreaChange}
            rows={4}
            required
          />

          <FormSection title="Social Media Links">
            <InputField
              label="LinkedIn Profile"
              id="linkedin"
              placeholder="https://linkedin.com/in/username"
              value={formData.linkedin}
              onChange={handleInputChange}
              type="url"
            />

            <InputField
              label="Twitter Profile"
              id="twitter"
              placeholder="https://twitter.com/username"
              value={formData.twitter}
              onChange={handleInputChange}
              type="url"
            />
          </FormSection>
        </FormSection>

        <div className="flex justify-end">
          <SubmitButton label="Save Team Member" isSubmitting={isSubmitting} />
        </div>
      </form>
    </motion.div>
  );
}
