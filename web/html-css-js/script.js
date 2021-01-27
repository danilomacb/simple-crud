const containerDiv = document.getElementById("container");

const addInput = `<input type="text" id="add" placeholder="New element" onkeyup="add(event)" />`;

async function add(e) {
  if (e.key === "Enter") {
    try {
      await fetch("http://localhost:3001", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: e.target.value }),
      });
    } catch (err) {
      alert("Error on add element");
      console.error("Error on add element\n", err);
      return;
    }

    e.target.value = "";
    list();
  }
}

async function list() {
  let res;
  try {
    res = await fetch("http://localhost:3001");
  } catch (err) {
    alert("Error on list elements");
    console.error("Error on list elements\n", err);
    return;
  }

  let elements;
  try {
    elements = await res.json();
  } catch (err) {
    alert("Error on list elements");
    console.error("Error on list elements, fail to convert to json\n", err);
    return;
  }

  let elementsInputs = "";
  elements.map(
    (element) =>
      (elementsInputs += `
        <div class="inputGroup">
          <button onClick={remove("${element.id}")}>X</button>
          <input
            type="text"
            value=${element.content}
            onkeyup="update(event, '${element.id}')"
          />
        </div>
      `)
  );

  containerDiv.innerHTML = addInput + elementsInputs;
}

async function update(e, id) {
  if (e.key === "Enter") {
    try {
      await fetch(`http://localhost:3001/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: e.target.value }),
      });
    } catch (err) {
      alert("Error on update element");
      console.error("Error on update element\n", err);
      return;
    }

    alert("Element updated");
    list();
  }
}

async function remove(id) {
  try {
    await fetch(`http://localhost:3001/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    alert("Error on remove element");
    console.error("Error on remove element\n", err);
    return;
  }

  list();
}

window.onload = list();
