import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const {addToUserHistory} = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <>
      <div className="navbar">

        <div className="nav">
          <img src="/logo192.png" className="logo" alt="Logo"/>
          <h3>Apna Video Call</h3>
        </div>
        <div className="nav">
          <IconButton onClick={() => navigate("/history")}>
            <RestoreIcon />
          </IconButton>
          <p style={{marginRight:"1rem"}}>History</p>
          <Button onClick={() => {
            localStorage.removeItem("token")
            navigate("/auth")
          }}>Logout</Button>
        </div>
      </div>
      <hr/>

      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2>Providing Quality Video Call Services</h2>

            <div className="meetingCode">
              <TextField onChange={e => setMeetingCode(e.target.value)}  id="outlined-basic" label="Enter Meeting Code" variant="outlined" />
              <Button onClick={handleJoinVideoCall} variant="contained">Join</Button>
            </div>
          </div>
        </div>

        <div className="rightPanel">
          <img srcSet="/logo3.png" alt="Logo3" />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);
