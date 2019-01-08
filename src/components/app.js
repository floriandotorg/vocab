import 'bootstrap'
import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { hot } from 'react-hot-loader/root'
import Routes from './routes'
import Navigation from './navigation'
import AddVocabModal from './add-vocab-modal'
import EditVocabModal from './edit-vocab-modal'
import DeleteConfirmModal from './delete-confirm-modal'
import '../style.scss'

export default hot(({ store, firebase, rfConfig, history }) => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={rfConfig}
      dispatch={store.dispatch}>
      <ConnectedRouter history={history}>
        <div className="pt-5">
          <Navigation />
          <Routes />

          <AddVocabModal />
          <EditVocabModal />
          <DeleteConfirmModal />
        </div>
      </ConnectedRouter>
    </ReactReduxFirebaseProvider>
  </Provider>
));
