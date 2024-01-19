function FIleInput({ name, value, onChange }) {
  //   const [value, setValue] = useState();
  const handeChange = (e) => {
    // console.log(e.target.files);
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  return <input type="file" onChange={handeChange} />;
}

export default FIleInput;
