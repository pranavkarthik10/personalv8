import React from 'react';

const SupportPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Support for Imagine Booth</h1>

      <p className="mb-4">
        If you need help with the Imagine Booth app or have any questions, please reach out to our support team.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Contact Information</h2>
      <p>
        You can contact us via email at: <a href="mailto:pranav.karthik@icloud.com" className="text-blue-600 hover:underline">pranav.karthik@icloud.com</a>
      </p>

      {/* Optional: Add links to FAQs, documentation, or a contact form if available */}
      {/*
      <h2 className="text-2xl font-semibold mt-6 mb-3">Frequently Asked Questions</h2>
      <p className="mb-4">
        Check out our <a href="/faq" className="text-blue-600 hover:underline">FAQ page</a> for answers to common questions.
      </p>
      */}
    </div>
  );
};

export default SupportPage;
