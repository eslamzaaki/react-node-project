import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "antd";

const FadeInSection = ({ children }) => {
  const domRef = React.useRef();

  const [isVisible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // In your case there's only one element to observe:
      if (entries[0].isIntersecting) {
        // Not possible to set it back to false like this:
        setVisible(true);

        // No need to keep observing:
        observer.unobserve(domRef.current);
      }
    });

    observer.observe(domRef.current);

    return () => observer.disconnect();
  }, [children]);

  return (
    <tr ref={domRef} className={isVisible ? " is-visible section" : "section"}>
      {children}
    </tr>
  );
};

function App() {
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:4000/campaigns")
      .then((res) => setCampaigns(res.data));
  }, []);

  return (
    <div className="App">
      <Modal
        title="Start Donation"
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
        }}
        footer={null}
        width="800px"
      >
        <div className="inputsCnt">
          <h4>Nickname</h4>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ margin: "0 15px", height: "30px" }}
          />

          <h4>Amount (USD)</h4>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ margin: "0 15px", height: "30px" }}
          />

          <button
            onClick={() => {
              setLoading(true);
              axios
                .post("http://localhost:4000/donations", {
                  nickname: name,
                  amount: amount,
                  campaignid: selectedCampaignId,
                })
                .then((res) => {
                  console.log(res);
                  setLoading(false);
                  setOpenModal(false);
                  setSelectedCampaignId(null);
                });
            }}
            disabled={name === "" || !amount}
          >
            {loading ? "..." : "Donate"}
          </button>
        </div>
      </Modal>

      <div className="tableCnt">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>DESCRIPTION</th>
              <th>GOAL AMOUNT</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((camp) => {
              return (
                <FadeInSection>
                  <td>{camp.id}</td>
                  <td>{camp.name} $</td>
                  <td>{camp.description}</td>
                  <td> {camp.amount}</td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedCampaignId(camp.id);
                        setOpenModal(true);
                      }}
                    >
                      {camp.status}
                    </button>
                  </td>
                </FadeInSection>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
