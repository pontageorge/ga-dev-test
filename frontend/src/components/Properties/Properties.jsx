import React, { memo, useEffect, useState } from "react";
import styles from "./Properties.module.css";
import { Table } from "../Table/Table";
import { Alert } from "../Alert/Alert";

export const Properties = ({ properties, error }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    if (properties) {
      setSelectedProperty(properties[0]);
    }
  }, [properties]);

  const parseAddressIdentifier = (paon, saon) => {
    let addressId = paon;

    if (saon) {
      addressId += ` ${saon}`;
    }

    return addressId;
  };

  const renderPropertyCards = () => {
    return properties.slice(0, 10).map((property) => (
      <div
        key={property.paon + property.saon + property.outcode}
        className={styles.card + (selectedProperty?.id === property.id ? ` ${styles.selected}` : "")}
        onClick={() => setSelectedProperty(property)}
      >
        <div>
          <img src="./house_placeholder.png" alt="placeholder img" />
        </div>
        <div className={styles.card_details}>
          <p>{parseAddressIdentifier(property.paon, property.saon)}</p>
          <p>{property.street}</p>
          <p>{`${property.outcode} ${property.incode}`}</p>
        </div>
      </div>
    ));
  };

  const renderTransactions = () => {
    return selectedProperty?.lrTransactions ? (
      <Table>
        <thead>
          <tr>
            <th>
              <span>ID</span>
            </th>
            <th>
              <span>Date</span>
            </th>
            <th>
              <span>Price</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedProperty.lrTransactions.map(({ id, date, price }) => (
            <>
              <tr key={id}>
                <td>{id}</td>
                <td>{date}</td>
                <td>£{price}</td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    ) : (
      <Alert>There are no transactions for this property</Alert>
    );
  };

  return (
    <div className={styles.container}>
      {properties && (
        <>
          <div className={styles.properties}>{renderPropertyCards()}</div>
          <div className={styles.transactions}>{renderTransactions()}</div>
        </>
      )}
      {error && <Alert>{error}</Alert>}
    </div>
  );
};

export default memo(Properties);
