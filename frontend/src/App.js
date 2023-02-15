import { useState } from "react";
import styles from "./App.module.css";

import { Properties, Header, Search } from "./components";
import { getPropertiesWithTransactions } from "./requests/properties.requests";

/**
 * IMPORTANT***
 *
 * This solution is quite basic in terms of functionality, I have limited number of records to 10 to avoid doing pagination, or even better
 * inifinite scroll.
 *
 * Also I used cards for the records, just taking into the account that there properties may have display images, but on
 * second thought a table like layout where each property can be expanded to reveal the transactions would be much better, would also deal with
 * responsiveness, this app doesn't have it.
 *
 * Just wanted to mention this so I show that I am aware of the limitations of this app, but there
 * are many more improvements that will be done which I will discuss in the tech interview.
 *
 */

function App() {
  const [propertyData, setPropertyData] = useState(null);
  const [error, setError] = useState(null);
  const [searchParam, setSearchParam] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!/\S/.test(searchParam)) {
      setPropertyData(null);
      setError("The string you have sumbitted is empty");
      return false;
    }

    const { fail, data } = await getPropertiesWithTransactions(searchParam);

    if (fail) {
      setPropertyData(null);
      setError(fail);
    } else {
      setPropertyData(data);
      setError(null);
    }

    setSearchParam("");
  };

  return (
    <div className={styles.app}>
      <Header />
      <Search searchParam={searchParam} setSearchParam={setSearchParam} onSubmitHandler={onSubmitHandler} />
      <Properties properties={propertyData} error={error} />
    </div>
  );
}

export default App;
