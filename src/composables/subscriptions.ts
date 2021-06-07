/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { reactive } from 'vue';
import { user, db } from '@/composables/firebase';
import dayjs from 'dayjs';

enum State {
  Subscriptions = 'subscriptions',
}

interface DataState<T> {
  loading: boolean;
  error: boolean;
  data: T;
}
interface NewSubscription {
  name: string;
  cost: {
    currency: string;
    dollar: string;
    value: number;
  };
  payment_date: Date;
  recurrence: string;
  user_id: string;
}
interface Subscription extends NewSubscription {
  id: string;
}
interface StateObject {
  [key: string]: DataState<any>;
}

const state = reactive<StateObject>({
  [State.Subscriptions]: {
    loading: false,
    error: false,
    data: null,
  },
});

export const useSubscriptions = () => {
  const subscriptions: DataState<Subscription[]> = state[State.Subscriptions];

  const setLoading = (stateKey: State, loadingState: boolean) => {
    state[stateKey].error = false;
    state[stateKey].loading = loadingState;
  };

  const setError = (stateKey: State, err: any) => {
    state[stateKey].error = true;
    state[stateKey].loading = false;
    console.error(err);
  };

  const setData = (stateKey: State, data: any) => {
    state[stateKey].error = false;
    state[stateKey].loading = false;
    state[stateKey].data = data;
  };

  const executeAction = async (stateKey: State, callback: () => void): Promise<void> => {
    try {
      setLoading(stateKey, true);
      await callback();
    } catch (err) {
      setError(stateKey, err);
    }
  };

  const unixToDate = (unixTime: number): Date => {
    return dayjs.unix(unixTime).toDate();
  };

  const getSubscriptions = async () => {
    const stateKey = State.Subscriptions;
    await executeAction(stateKey, async () => {
      if (user.value) {
        db.collection('subscriptions').where('user_id', '==', user.value.uid).orderBy('payment_date').onSnapshot((snapshot) => {
          const payload: Subscription[] = [];
          snapshot.forEach((doc) => {
            const docData = doc.data();
            const data = {
              ...docData,
              id: doc.id,
              payment_date: unixToDate(docData.payment_date.seconds),
            } as Subscription;
            payload.push(data);
          });
          setData(stateKey, payload);
        });
      } else {
        console.error('Invalid user');
      }
    });
  };

  const addSubscription = async (param: NewSubscription) => {
    if (user.value) {
      db.collection('subscriptions').add(param);
    } else {
      console.error('Invalid user');
    }
  };

  const deleteSubscription = async (id: string) => {
    if (user.value) {
      db.collection('subscriptions').doc(id).delete();
    } else {
      console.error('Invalid user');
    }
  };

  return {
    // getters
    subscriptions,

    // actions
    getSubscriptions,
    addSubscription,
    deleteSubscription,
  };
};
