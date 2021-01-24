import { useEffect, useState } from "react";
import axios from "axios";

interface IElement {
  id: number & string;
  content: string;
}

function App() {
  const [elements, setElements] = useState<IElement[]>([]);

  async function list() {
    let res;
    try {
      res = await axios("http://localhost:3001");
    } catch (err) {
      alert("Error on list elements");
      console.error("Error on list elements\n", err);
      return;
    }

    setElements(res.data);
  }

  useEffect(() => {
    list();
  }, []);

  async function add(e: React.KeyboardEvent & React.ChangeEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      try {
        await axios.post("http://localhost:3001/", { content: e.target.value });
      } catch (err) {
        alert("Error on add element");
        console.error("Error on add element\n", err);
        return;
      }

      e.target.value = "";
      list();
    }
  }

  async function update(
    e: React.KeyboardEvent & React.ChangeEvent<HTMLInputElement>,
    id: number & string
  ) {
    if (e.key === "Enter") {
      try {
        await axios.put(`http://localhost:3001/${id}`, { content: e.target.value });
      } catch (err) {
        alert("Error on update element");
        console.error("Error on update element\n", err);
        return;
      }

      alert("Element updated");
    }
  }

  async function remove(id: number & string) {
    try {
      await axios.delete(`http://localhost:3001/${id}`);
    } catch (err) {
      alert("Error on remove element");
      console.error("Error on remove element\n", err);
      return;
    }

    list();
  }

  if (elements) {
    return (
      <div id="container">
        <input type="text" id="add" placeholder="New element" onKeyDown={add} />

        {elements.map((element: IElement) => (
          <div className="inputGroup" key={element.id}>
            <button onClick={() => remove(element.id)}>X</button>
            <input
              type="text"
              defaultValue={element.content}
              onKeyDown={(e: React.KeyboardEvent & React.ChangeEvent<HTMLInputElement>) =>
                update(e, element.id)
              }
            />
          </div>
        ))}
      </div>
    );
  }

  return <h1>Loading Elements...</h1>;
}

export default App;
