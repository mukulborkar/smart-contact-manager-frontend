import { useEffect, useState } from "react";
import "./Card.css";
import axios from "axios";
import { getCurrentUser, getToken } from "../auth";

interface MyCardProp {
  searchValue: string;
}
const MyCard: React.FC<MyCardProp> = ({ searchValue }) => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/contacts/users/" + getCurrentUser().id, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((result) => {
        setContacts(result.data);
        setFilteredContacts(result.data);
      })
      .catch((error) => console.log("Error fetching contacts:", error));
  }, []);
  console.log(contacts);

  useEffect(() => {
    const filteredResults = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredContacts(filteredResults);
  }, [searchValue, contacts]);

  console.log(filteredContacts);
  return (
    <div className="card-container">
      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact, i) => (
          <div
            className="cards"
            key={contact.id}
            style={{ width: "450px", height: "200px", marginLeft: "1px" }}
          >
            <div className="card-body">
              <div className="row">
                <div className="col-5">
                  <div className="image-content">
                    <img
                      src={window.location.origin + "/default.png"}
                      className="rounded-circle "
                      alt="User Avatar"
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                </div>
                <div
                  className="col-6"
                  style={{
                    textAlign: "left",
                    marginLeft: "20px",
                    paddingTop: "15px",
                  }}
                >
                  <h6 style={{ paddingBottom: "5px" }}>
                    {" "}
                    <i className="fa fa-user-o" aria-hidden="true"></i>{" "}
                    {contact.name}
                  </h6>

                  <h6 style={{ paddingBottom: "5px" }}>
                    {" "}
                    <i className="fa fa-id-badge" aria-hidden="true"></i>{" "}
                    {contact.work}
                  </h6>

                  <h6 style={{ paddingBottom: "5px" }}>
                    {" "}
                    <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
                    {contact.email}
                  </h6>

                  <h6 style={{ paddingBottom: "5px" }}>
                    {" "}
                    <i className="fa fa-phone" aria-hidden="true"></i>{" "}
                    {contact.phone}
                  </h6>
                </div>
              </div>
            </div>

            <div className="col-4 "></div>

            <div className="col-4"></div>
          </div>
        ))
      ) : (
        <p className="msg-center" style={{ color: "red", fontSize: "25px" }}>
          No Contacts Found
        </p>
      )}
    </div>
  );
};

export default MyCard;