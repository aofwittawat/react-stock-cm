import { STOCK_FAILED, STOCK_FETCHING, STOCK_SUCCESS, server } from "../Constants";
import { httpClient } from "./../utils/HttpClient";

export const setStateStockToFetching = () => ({
  type: STOCK_FETCHING,
});

export const setStateStockToSuccess = (payload) => ({
  type: STOCK_SUCCESS,
  payload,
});

export const setStateStockToFailed = () => ({
  type: STOCK_FAILED,
});

export const getProduct = () => {
  return (dispatch) => {
    dispatch(setStateStockToFetching());
    doGetProducts(dispatch);
  };
};

const doGetProducts = async (dispatch) => {
  try {
    let result = await httpClient.get(server.PRODUCT_URL);
    dispatch(setStateStockToSuccess(result.data));
  } catch (err) {
    dispatch(setStateStockToFailed());
  }
};
