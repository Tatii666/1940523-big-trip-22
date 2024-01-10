import { render, replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import ListSortView from '../view/list-sort-view.js';
import TripListView from '../view/trip-list-view.js';
import TripPointView from '../view/trip-point-view.js';

export default class MainPresenter {
  #tripContainer = null;
  #destinationModel = null;
  #eventPointsModel = null;
  #offersModel = null;
  #sortComponent = new ListSortView();
  #tripListComponent = new TripListView();
  #eventPoints = [];
  #destinations = [];

  constructor({ tripContainer, destinationModel, eventPointsModel, offersModel }) {
    this.#tripContainer = tripContainer;
    this.#destinationModel = destinationModel;
    this.#eventPointsModel = eventPointsModel;
    this.#offersModel = offersModel;
    this.#eventPoints = this.#eventPointsModel.get();
    this.#destinations = this.#destinationModel.get();
    this.offers = this.#offersModel.get();
  }

  init() {
    render(this.#sortComponent, this.#tripContainer);
    render(this.#tripListComponent, this.#tripContainer);
    this.#eventPoints.forEach((eventPoint) => {
      const destination = this.#destinationModel.getById(eventPoint.destination);
      this.#renderEventPoint(this.#destinations, destination, eventPoint, this.#offersModel.getByType(eventPoint.type));
    });
  }

  #renderEventPoint(destinations, destination, eventPoint, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const eventPointComponent = new TripPointView({
      destination,
      eventPoint,
      offers,
      onEditClick: () => {
        editPointHandler();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const eventEditPointComponent = new EditPointView({
      destinations,
      destination,
      eventPoint,
      offers,
      onCloseClick: () => {
        editPointCloseHandler();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onSaveEdit: () => {
        editPointSubmitHandler();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToEditForm() {
      replace(eventEditPointComponent, eventPointComponent);
    }

    function replaceEditFormToPoint() {
      replace(eventPointComponent, eventEditPointComponent);
    }

    function editPointHandler() {
      replacePointToEditForm();
    }

    function editPointCloseHandler() {
      replaceEditFormToPoint();
    }

    function editPointSubmitHandler() {
      replaceEditFormToPoint();
    }
    render(eventPointComponent, this.#tripListComponent.element);
  }
}
