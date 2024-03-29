import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import order from '../../models/order';
export const SET_ONGOING_ORDERS = 'SET_ONGOING_ORDERS';
export const SET_FINISHED_ORDERS = 'SET_FINISHED_ORDERS';
export const SET_COLLECTED_ORDERS = 'SET_COLLECTED_ORDERS';
export const SET_REFUNDED_ORDERS = 'SET_REFUNDED_ORDERS';
export const SET_STOREONGOING_ORDERS = 'SET_STOREONGOING_ORDERS';
export const SET_STOREFINISHED_ORDERS = 'SET_STOREFINISHED_ORDERS';
export const SET_STORECOLLECTED_ORDERS = 'SET_STORECOLLECTED_ORDERS';
export const SET_STOREREFUNDED_ORDERS = 'SET_STOREREFUNDED_ORDERS';
export const addOrder = (
  cartItems,
  productIDs,
  totalPrice,
  storeId,
  storeName,
) => {
  return (dispatch, getState) => {
    const currentDate = new Date();
    const userId = getState().auth.userId;
    firestore().collection('orders').add({
      storeId: storeId,
      storeName: storeName,
      customerId: userId,
      totalPrice: totalPrice,
      status: 'ongoing',
      items: cartItems,
      productId: productIDs,
      dateOrdered: currentDate,
      dateCollected: '',
      isRated: false,
    });
  };
};
//Customer Orders Screen
export const fetchOnGoingOrders = (dispatch, getState) => {
  const userId = getState().auth.userId;
  firestore()
    .collection('orders')
    .orderBy('dateOrdered', 'desc')
    .where('status', '==', 'ongoing')
    .where('customerId', '==', userId)
    .limit(5)
    .onSnapshot(documentSnapshot => {
      const onGoingOrders = [];
      documentSnapshot.docs.forEach(item => {
        const onGoingOrderData = item.data();
        const orderId = item.id;
        onGoingOrders.push(
          new order(
            orderId,
            onGoingOrderData.storeId,
            onGoingOrderData.storeName,
            onGoingOrderData.customerId,
            onGoingOrderData.status,
            onGoingOrderData.items,
            onGoingOrderData.totalPrice,
            onGoingOrderData.dateOrdered,
            onGoingOrderData.dateCollected,
            onGoingOrderData.isRated,
          ),
        );
      });

      dispatch({
        type: SET_ONGOING_ORDERS,
        onGoingOrderInfo: onGoingOrders,
      });
    });
};

export const fetchFinishedOrders = (dispatch, getState) => {
  const userId = getState().auth.userId;
  firestore()
    .collection('orders')
    .orderBy('dateOrdered', 'desc')
    .where('status', '==', 'finished')
    .where('customerId', '==', userId)
    .limit(3)
    .onSnapshot(documentSnapshot => {
      const finishedOrders = [];
      documentSnapshot.docs.forEach(item => {
        const finishedOrderData = item.data();
        const orderId = item.id;
        finishedOrders.push(
          new order(
            orderId,
            finishedOrderData.storeId,
            finishedOrderData.storeName,
            finishedOrderData.customerId,
            finishedOrderData.status,
            finishedOrderData.items,
            finishedOrderData.totalPrice,
            finishedOrderData.dateOrdered,
            finishedOrderData.dateCollected,
            finishedOrderData.isRated,
          ),
        );
      });

      dispatch({
        type: SET_FINISHED_ORDERS,
        finishedOrderInfo: finishedOrders,
      });
    });
};
export const fetchCollectedOrders = (dispatch, getState) => {
  const userId = getState().auth.userId;
  firestore()
    .collection('orders')
    .orderBy('dateOrdered', 'desc')
    .where('status', 'in', ['collected', 'rated'])
    .where('customerId', '==', userId)
    .limit(3)
    .onSnapshot(documentSnapshot => {
      const collectedOrders = [];
      documentSnapshot.docs.forEach(item => {
        const collectedOrderData = item.data();
        const orderId = item.id;
        collectedOrders.push(
          new order(
            orderId,
            collectedOrderData.storeId,
            collectedOrderData.storeName,
            collectedOrderData.customerId,
            collectedOrderData.status,
            collectedOrderData.items,
            collectedOrderData.totalPrice,
            collectedOrderData.dateOrdered,
            collectedOrderData.dateCollected,
            collectedOrderData.isRated,
          ),
        );
      });

      dispatch({
        type: SET_COLLECTED_ORDERS,
        collectedOrderInfo: collectedOrders,
      });
    });
};
export const fetchRefundedOrders = (dispatch, getState) => {
  const userId = getState().auth.userId;
  firestore()
    .collection('orders')
    .orderBy('dateOrdered', 'desc')
    .where('status', '==', 'refunded')
    .where('customerId', '==', userId)
    .limit(3)
    .onSnapshot(documentSnapshot => {
      const refundedOrders = [];
      documentSnapshot.docs.forEach(item => {
        const refundedOrderData = item.data();
        const orderId = item.id;
        refundedOrders.push(
          new order(
            orderId,
            refundedOrderData.storeId,
            refundedOrderData.storeName,
            refundedOrderData.customerId,
            refundedOrderData.status,
            refundedOrderData.items,
            refundedOrderData.totalPrice,
            refundedOrderData.dateOrdered,
            refundedOrderData.dateCollected,
            refundedOrderData.isRated,
          ),
        );
      });

      dispatch({
        type: SET_REFUNDED_ORDERS,
        refundedOrderInfo: refundedOrders,
      });
    });
};

//Tailor Orders Screen
export const fetchStoreOnGoingOrders = storeId => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;

    firestore()
      .collection('orders')
      .orderBy('dateOrdered', 'desc')
      .where('status', '==', 'ongoing')
      .where('storeId', '==', storeId)
      .limit(5)
      .onSnapshot(documentSnapshot => {
        const storeOngoingOrders = [];
        documentSnapshot.docs.forEach(item => {
          const storeOngoingData = item.data();
          const orderId = item.id;
          storeOngoingOrders.push(
            new order(
              orderId,
              storeOngoingData.storeId,
              storeOngoingData.storeName,
              storeOngoingData.customerId,
              storeOngoingData.status,
              storeOngoingData.items,
              storeOngoingData.totalPrice,
              storeOngoingData.dateOrdered,
              storeOngoingData.dateCollected,
              storeOngoingData.isRated,
            ),
          );
        });

        dispatch({
          type: SET_STOREONGOING_ORDERS,
          storeOngoingOrderInfo: storeOngoingOrders,
        });
      });
  };
};
export const fetchStoreFinishedOrders = storeId => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    firestore()
      .collection('orders')
      .orderBy('dateOrdered', 'desc')
      .where('status', '==', 'finished')
      .where('storeId', '==', storeId)
      .limit(3)
      .onSnapshot(documentSnapshot => {
        const storeFinishedOrders = [];
        documentSnapshot.docs.forEach(item => {
          const storeFinishedData = item.data();
          const orderId = item.id;
          storeFinishedOrders.push(
            new order(
              orderId,
              storeFinishedData.storeId,
              storeFinishedData.storeName,
              storeFinishedData.customerId,
              storeFinishedData.status,
              storeFinishedData.items,
              storeFinishedData.totalPrice,
              storeFinishedData.dateOrdered,
              storeFinishedData.dateCollected,
              storeFinishedData.isRated,
            ),
          );
        });

        dispatch({
          type: SET_STOREFINISHED_ORDERS,
          storeFinishedOrderInfo: storeFinishedOrders,
        });
      });
  };
};
export const fetchStoreCollectedOrders = storeId => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    firestore()
      .collection('orders')
      .orderBy('dateOrdered', 'desc')
      .where('status', '==', 'collected')
      .where('storeId', '==', storeId)
      .limit(3)
      .onSnapshot(documentSnapshot => {
        const storeCollectedOrders = [];
        documentSnapshot.docs.forEach(item => {
          const storeCollectedData = item.data();

          const orderId = item.id;
          storeCollectedOrders.push(
            new order(
              orderId,
              storeCollectedData.storeId,
              storeCollectedData.storeName,
              storeCollectedData.customerId,
              storeCollectedData.status,
              storeCollectedData.items,
              storeCollectedData.totalPrice,
              storeCollectedData.dateOrdered,
              storeCollectedData.dateCollected,
              storeCollectedData.isRated,
            ),
          );
        });

        dispatch({
          type: SET_STORECOLLECTED_ORDERS,
          storeCollectedOrderInfo: storeCollectedOrders,
        });
      });
  };
};
export const fetchStoreRefundedOrders = storeId => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    firestore()
      .collection('orders')
      .orderBy('dateOrdered', 'desc')
      .where('status', '==', 'refunded')
      .where('storeId', '==', storeId)
      .limit(3)
      .onSnapshot(documentSnapshot => {
        const storeRefundedOrders = [];
        documentSnapshot.docs.forEach(item => {
          const storeRefundedData = item.data();

          const orderId = item.id;
          storeRefundedOrders.push(
            new order(
              orderId,
              storeRefundedData.storeId,
              storeRefundedData.storeName,
              storeRefundedData.customerId,
              storeRefundedData.status,
              storeRefundedData.items,
              storeRefundedData.totalPrice,
              storeRefundedData.dateOrdered,
              storeRefundedData.dateCollected,
              storeRefundedData.isRated,
            ),
          );
        });

        dispatch({
          type: SET_STOREREFUNDED_ORDERS,
          storeRefundedOrderInfo: storeRefundedOrders,
        });
      });
  };
};

export const updateOngoingOrder = orderID => {
  return (dispatch, getState) => {
    firestore()
      .collection('orders')
      .doc(orderID)
      .update({
        status: 'finished',
      })
      .then(() => {
        console.log('Order Updated');
      });
  };
};

export const updateFinishedOrder = orderID => {
  const currentDate = new Date();
  return (dispatch, getState) => {
    firestore()
      .collection('orders')
      .doc(orderID)
      .update({
        dateCollected: currentDate,
        status: 'collected',
      })
      .then(() => {
        console.log('Order Updated');
      });
  };
};
export const refundOrder = orderID => {
  return (dispatch, getState) => {
    firestore()
      .collection('orders')
      .doc(orderID)
      .update({
        status: 'refunded',
      })
      .then(() => {
        console.log('Order Updated');
      });
  };
};

/*  .then(documentSnapshot => {
      const storeOngoingOrders = [];
      documentSnapshot.docs.forEach(item => {
        const storeOngoingData = item.data();
        const orderId = item.id;
        storeOngoingOrders.push(
          new order(
            orderId,
            storeOngoingData.storeId,
            storeOngoingData.storeName,
            storeOngoingData.customerId,
            storeOngoingData.status,
            storeOngoingData.items,
            storeOngoingData.totalPrice,
            storeOngoingData.dateOrdered,
            storeOngoingData.dateCollected,
          ),
        );
      });

      dispatch({
        type: SET_STOREONGOING_ORDERS,
        storeOngoingOrderInfo: storeOngoingOrders,
      });
    }); */
