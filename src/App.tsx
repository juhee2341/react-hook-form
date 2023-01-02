import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "./components/Header";

interface IFormInputs {
  Email: string;
  Name: string;
  Password: string;
  Password_Confirm: string;
  Residence: string;
  Welcome_Message: string;
}


function App() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<IFormInputs>();
  const [data, setData] = useState("");
  const password = useRef({});

  return (
    <div className="App">
      <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
        <Header />
        <label>Email</label>
        <input
          {...register('Email', { required: "Email is required.", pattern: { value: /^\S+@\S+$/i, message: 'Check your format' } })}
          type="email"
          placeholder="ex) practice@gmail.com"
        />
        {errors.Email && <p>{errors.Email.message}</p>}
        <label>Name</label>
        <input
          {...register("Name", { required: "Name is required.", maxLength: { value: 30, message: 'Up to 30 characters.' } })}
          placeholder="ex) Lee Jay"
        />
        {errors.Name && <p>{errors.Name.message}</p>}
        <label>Password</label>
        <input
          {...register("Password", { required: "Password is required.", minLength: { value: 6, message: 'Must be longer than 6 characters.' } })}
          type="password"
        />
        {errors.Password && <p>{errors.Password.message}</p>}
        <label>Password Confirm</label>
        <input
          {...register("Password_Confirm", { required: "Check your password", validate: (value) => value === password.current })}
          type="password"
        />
        {errors.Password_Confirm && <p>{errors.Password_Confirm.message}</p>}
        {errors.Password_Confirm?.type === 'validate' && <p>The passwords do not match.</p>}
        <label>Residence</label>
        <select
          {...register("Residence", { required: true })}
        >
          <option value="">Please select !!!</option>
          <option value="Seoul">Seoul</option>
          <option value="Inchoen">Incheon</option>
          <option value="Others">Others</option>
        </select>
        <label>Welcome Message</label>
        <textarea
          {...register("Welcome_Message")}
          placeholder="Welcome Message"
        />
        <p>{data}</p>
        <input type="submit" />
      </form>
    </div >
  );
}

export default App;
