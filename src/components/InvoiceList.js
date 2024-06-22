// src/components/InvoiceList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const authInstance = window.gapi.auth2.getAuthInstance();
      const idToken = authInstance.currentUser.get().getAuthResponse().id_token;
      const response = await axios.get('/api/invoices', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      setInvoices(response.data);
    };

    fetchInvoices();
  }, []);

  return (
    <div>
      <h2>Due Invoices</h2>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>{invoice.details}</li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;
