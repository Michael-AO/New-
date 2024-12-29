import "./styles.css";
import React from "react";
import logo from "./logo.png";
import { useState } from "react";

const initialSpeakers = [
  {
    name: "MICHAEL OPEYEMI",
    role: "CEO, ZIGGY",
    id: "001",
  },

  {
    name: "OBIAGWU NORA",
    role: "CEO, PEP",
    id: "002",
  },
];

const selectedSpeakers = [];

function Button({ children, onClick }) {
  return (
    <div>
      <button className="button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default function App() {
  const [speakerList, setSpeakerList] = useState(initialSpeakers);
  const [selectedList, setSelectedList] = useState(selectedSpeakers);
  const [selection, setSelection] = useState(null);
  const [showAddSpeaker, setShowAddSpeaker] = useState(false);

  function handleAddSpeaker(speaker) {
    setSpeakerList((speakerList) => [...speakerList, speaker]);
  }

  function handleShowAddSpeaker() {
    setShowAddSpeaker((show) => !show);
  }

  function handleSelection(speaker) {
    setSelectedList((selectedList) => [...selectedList, speaker]);
  }

  function handleRemoveSelection(speakerId) {
    setSelectedList(selectedList.filter((speaker) => speaker.id !== speakerId));
  }

  return (
    <div className="App">
      <div>
        <Header />
      </div>

      <div className="content">
        <Available
          speakers={speakerList}
          showAddSpeaker={handleShowAddSpeaker}
          isOpen={showAddSpeaker}
          onSelection={handleSelection}
        />
        <Selected Selection={selectedList} onRemove={handleRemoveSelection} />
      </div>

      <div>
        {showAddSpeaker && (
          <InputSpeaker speakers={speakerList} AddSpeaker={handleAddSpeaker} />
        )}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <div className="header-logo">
        <img src={logo} alt="logo" />

        <div className="header-heading">FIGMA’S CONFERENCE FOR PEOPLE</div>
        <div className="header-heading">WHO BUILD PRODUCTS</div>
      </div>

      <div className="header-navigation-a">
        <nav>RECORDING </nav>
        <nav>AGENDA</nav>
        <nav>SPEAKER</nav>
      </div>
    </div>
  );
}

function Available({ speakers, showAddSpeaker, isOpen, onSelection }) {
  return (
    <div>
      <div className="available-speaker">
        <div>
          <h2 className="available-speakers-h2">AVAILABLE KEYNOTE SPEAKERS</h2>
        </div>

        <div>
          {speakers.map((speaker) => (
            <SpeakerItem
              speaker={speaker}
              onSelection={onSelection}
              key={speaker.id}
            />
          ))}
        </div>

        <div>
          <button className="add-speaker-btn" onClick={showAddSpeaker}>
            {isOpen ? "Close form" : "Add Speaker"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SpeakerItem({ speaker, onSelection }) {
  return (
    <div className="speaker-item">
      <div className="speaker-item-speaker-info">
        <div className="speaker-info-name">{speaker.name}</div>
        <div className="speaker-info-role">{speaker.role}</div>
      </div>
      <button
        className="speaker-item-select-btn"
        onClick={() => onSelection(speaker)}
      >
        Select
      </button>
    </div>
  );
}

function InputSpeaker({ speakers, AddSpeaker }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !role) return;

    const newSpeaker = {
      name,
      role,
      id: crypto.randomUUID(),
    };

    AddSpeaker(newSpeaker);

    setName("");
    setRole("");
  }

  return (
    <form className="add-speaker-form" onSubmit={handleSubmit}>
      {/* ADD NAME */}
      <div>
        <label className="add-speaker-form-label">
          <h4 className="add-speaker-form-label-h4"> Speakers Name</h4>
        </label>
        <input
          type="text"
          className="add-speaker-form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* ADD ROLE */}
      <div>
        <label className="add-speaker-form-label">
          <h4 className="add-speaker-form-label-h4">Speakers Role</h4>
        </label>
        <input
          type="text"
          className="add-speaker-form-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>

      <button className="add-speaker-form-button">Submit</button>
    </form>
  );
}

function Selected({ Selection, onRemove }) {
  return (
    <div>
      <div className="selected-speaker">
        <div>
          <h2 className="selected-speakers-h2">SELECTED KEYNOTE SPEAKERS</h2>
        </div>
      </div>
      <div>
        {Selection.length > 0 ? (
          Selection.map((speaker) => (
            <div className="speaker-item" key={speaker.id}>
              <div className="speaker-item-speaker-info">
                <div className="speaker-info-name">{speaker.name}</div>
                <div className="speaker-info-role">{speaker.role}</div>
              </div>
              <button
                className="speaker-item-select-btn"
                onClick={() => onRemove(speaker.id)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <div> You have no speaker selected</div>
        )}
      </div>
      <div>YOU HAVE SELECTED {Selection.length} SPEAKER(S)</div>
      <div>
        YOU HAVE {initialSpeakers.length - Selection.length} AVAILABLE SPEAKERS
      </div>
    </div>
  );
}
