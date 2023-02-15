import styles from "./Search.module.css";

export const Search = ({ searchParam, setSearchParam, onSubmitHandler }) => {
  const onChangeHandler = (e) => {
    setSearchParam(e.target.value.toUpperCase());
  };

  return (
    <form onSubmit={onSubmitHandler} className={styles.container}>
      <input
        type="text"
        id="search"
        name="search"
        value={searchParam}
        onChange={onChangeHandler}
        placeholder="Search by ID, street or postcode"
      />
    </form>
  );
};
