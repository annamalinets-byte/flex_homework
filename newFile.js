async function main() {
  let registered = await registration({
username: "malina24",
  email: "ugvuitvyircd@yteacougv.com",
  password: "19Og_my2",
  gender: "female",
  age: 16
});
  console.log(registered);
  const { token } = await login({
    email: "ugvuitvyircd@yteacougv.com",
    password: "19Og_my2",
  });
  const { id: id1 } = await createTask(
    { title: "Встретиться с друзьями" },
    token
  );
  const { id: id2 } = await createTask({ title: "Купить рыбу" }, token);
  let tasks = await getTasks(token);
  console.log(tasks);
  let edited = await editTasks("Купить мясо", id2, token);
  console.log(edited)
  let result = await deleteTodo(id1, token);
  let result2 = await deleteTodo(id2, token);
  console.log(result, result2);
}
main();
async function registration(user) {
  try {
    let response = await fetch(
      "https://todo-redev.herokuapp.com/api/users/register",
      {method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }
    );
    let data = await response.json()
    return data
  } catch (error) {
    console.log(error);
  }
}

async function login(creds) {
  try {
    let response = await fetch(
      "https://todo-redev.herokuapp.com/api/auth/login",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      }
    );
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function createTask(creds, token) {
  try {
    let response = await fetch("https://todo-redev.herokuapp.com/api/todos", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(creds),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getTasks(token) {
  try {
    let response = await fetch(
      "https://todo-redev.herokuapp.com/api/todos?isCompleted=false",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// getTodos()

async function editTasks(task, id, token) {
  try {
    let response = await fetch(
      `'https://todo-redev.herokuapp.com/api/todos/${id}`,
      {
        method: "PATCH",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: { title: `${task}` },
      }
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function deleteTodo(id, token) {
  try {
    let response = await fetch(
      `https://todo-redev.herokuapp.com/api/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
