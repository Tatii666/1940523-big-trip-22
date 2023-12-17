import MainPresenter from './presenter/main-presenter';
import HeaderPresenter from './presenter/header-presenter';
import './mock/destination.js';
import DestinationModel from './model/destination-model.js';
import EventPointsModel from './model/event-points-model.js';
import OffersModel from './model/offers-model.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteTripEventsElements = document.querySelector('.trip-events');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const destinationModel = new DestinationModel();
const eventPointsModel = new EventPointsModel();
const offersModel = new OffersModel();

const headerPresenter = new HeaderPresenter({
  tripHeaderInfo: siteTripMainElement,
  tripHeaderFilter: siteFiltersElement
});
const mainPresenter = new MainPresenter({
  tripContainer: siteTripEventsElements,
  destinationModel,
  eventPointsModel,
  offersModel
});

headerPresenter.init();
mainPresenter.init();
