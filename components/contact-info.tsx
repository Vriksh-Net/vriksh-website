import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
        <p className="text-gray-600 mb-8">
          Have questions or need assistance? Our team is here to help. Contact
          us using the information below or fill out the form to send us a
          message.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start">
          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center mr-4 flex-shrink-0">
            <MapPin className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h4 className="text-lg font-medium mb-1">Our Location</h4>
            <p className="text-gray-600">
              I - 1691, Chittaranjan Park,
              <br />
              New Delhi - 110019, India
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center mr-4 flex-shrink-0">
            <Phone className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h4 className="text-lg font-medium mb-1">Phone Number</h4>
            <p className="text-gray-600">+91-11-35724258 | +91-9560111351</p>
            <p className="text-gray-600">+91-9560090847 | +91-9810130787</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center mr-4 flex-shrink-0">
            <Mail className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h4 className="text-lg font-medium mb-1">Email Address</h4>
            <p className="text-gray-600">info@vrikshconsulting.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
