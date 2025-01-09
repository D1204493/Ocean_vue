import { createStore } from 'vuex';
const store = createStore({
    state: {
        ticketOrder:  null,
    },
    getters: {
        getTicketOrder: (state) => state.ticketOrder,
    },
    mutations: {
        setTicketOrder(state, data) {
            state.ticketOrder = data;
        },
    },
    actions: {

    },
});

export default store;