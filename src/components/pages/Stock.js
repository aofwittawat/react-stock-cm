/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import * as stockActions from "./../../actions/stock.action";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { imageUrl } from "./../../Constants";
import NumberFormat from "react-number-format";
import Moment from "react-moment";

export default function Stock() {
  const dispatch = useDispatch();
  const stockReducer = useSelector(({ stockReducer }) => stockReducer);

  useEffect(() => {
    dispatch(stockActions.getProduct());
  }, []);

  const columns = [
    {
      title: "Id",
      render: (item) => <Typography variant="body1">{item.id}</Typography>,
    },
    {
      title: "Image",
      cellStyle: { padding: 0 },
      render: (item) => (
        <img
          src={`${imageUrl}/images/${item.image}?dummy=${Math.random()}`}
          style={{ width: 70, height: 70, borderRadius: "5%" }}
        />
      ),
    },
    {
      title: "Name",
      cellStyle: { minWidth: 700 },
      render: (item) => <Typography variant="body1">{item.name}</Typography>,
    },

    {
      title: "Price",
      render: (item) => (
        <Typography variant="body1">
          <NumberFormat
            value={item.price}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"฿"}
          />
        </Typography>
      ),
    },
    {
      title: "Stock",
      render: (item) => (
        <Typography variant="body1">
          <NumberFormat
            value={item.stock}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={0}
            fixedDecimalScale={true}
            suffix={" pcs"}
          />
        </Typography>
      ),
    },
    {
      title: "Updated",
      render: (item) => (
        <Typography>
          <Moment format="DD/MM/YYYY">{item.updatedAt}</Moment>
        </Typography>
      ),
    },
  ];

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "700",
      marginTop: 0,
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <MaterialTable
          columns={columns}
          data={stockReducer.result ? stockReducer.result : []}
          title="Stock"
        />
      </div>
    </div>
  );
}
