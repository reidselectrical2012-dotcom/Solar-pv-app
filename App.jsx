import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card.jsx";
import { Button } from "./components/ui/button.jsx";

export default function App() {
  const [form, setForm] = useState({
    project: "",
    client: "",
    date: "",
    engineer: "",
    strings: [],
    overall: ""
  });

  const [entry, setEntry] = useState({
    stringId: "",
    voc: "",
    isc: "",
    insulation: "",
    polarity: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("pvApp");
    if (saved) setForm(JSON.parse(saved));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEntryChange = (e) => setEntry({ ...entry, [e.target.name]: e.target.value });

  const addEntry = () => {
    const insulationPass = parseFloat(entry.insulation || 0) >= 1;
    const polarityPass = (entry.polarity || "").toLowerCase() === "pass";
    const result = insulationPass && polarityPass ? "PASS" : "FAIL";

    setForm({ ...form, strings: [...form.strings, { ...entry, result }] });
    setEntry({ stringId: "", voc: "", isc: "", insulation: "", polarity: "" });
  };

  const save = () => {
    const overall = form.strings.every(s => s.result === "PASS") ? "PASS" : "FAIL";
    const updated = { ...form, overall };
    setForm(updated);
    localStorage.setItem("pvApp", JSON.stringify(updated));
    alert("Saved");
  };

  return (
    <div style={{padding:20, maxWidth:800, margin:"auto"}}>
      <Card>
        <CardContent>
          <h2>Solar PV Test Sheet</h2>
          <input name="project" placeholder="Project" onChange={handleChange} /><br/>
          <input name="client" placeholder="Client" onChange={handleChange} /><br/>
          <input type="date" name="date" onChange={handleChange} /><br/>
          <input name="engineer" placeholder="Engineer" onChange={handleChange} /><br/>

          <h3>Add String</h3>
          <input name="stringId" placeholder="String" onChange={handleEntryChange} />
          <input name="voc" placeholder="Voc" onChange={handleEntryChange} />
          <input name="isc" placeholder="Isc" onChange={handleEntryChange} />
          <input name="insulation" placeholder="Insulation" onChange={handleEntryChange} />
          <input name="polarity" placeholder="Polarity" onChange={handleEntryChange} />
          <Button onClick={addEntry}>Add</Button>

          <h3>Results</h3>
          {form.strings.map((s,i)=>(
            <div key={i}>{s.stringId} - {s.result}</div>
          ))}

          <Button onClick={save}>Save</Button>
        </CardContent>
      </Card>
    </div>
  );
}
