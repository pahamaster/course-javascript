import InteractiveMap from './interactiveMap';
import Storage from './storage.js';

export default class GeoReview {
  constructor () {
    this.formTemplate=document.querySelector('#addFormTemplate').innerHTML;
    this.storage = new Storage('saveGeoReview');
    this.map = new InteractiveMap('map', this.onClick.bind(this));
    this.map.init().then(this.onInit.bind(this));
  }

  async onInit() {
    const coords=this.storage.getCoords();

    for (const item of coords) {
      for (let i=0; i<item.total; i++)
        this.map.createPlacemark(item.coords);
    }
    document.body.addEventListener('click', this.onDocumentClick.bind(this));
  }

  createForm(coords, reviews) {
    const root = document.createElement('div');
    root.innerHTML = this.formTemplate;
    //const root=document.querySelector('#addFormTemplate');
    const reviewList = root.querySelector('.review-list');
    const reviewForm = root.querySelector('#review-form');
    //console.log(reviewForm);
    reviewForm.dataset.coords = JSON.stringify(coords);
    for (const item of reviews) {
      const div = document.createElement('div');
      div.classList.add('review-item');
      div.innerHTML = `
        <div>
        <b>${item.name}</b> [${item.place}]
        </div>
        <div>${item.text}</div>
        `;
      reviewList.appendChild(div);
    }
    return root;
  }

  async onClick(coords) {
    await this.map.openBalloon(coords, 'Загрузка...');
    const list = this.storage.getByCoords(coords);
    const form = this.createForm(coords, list);
    //console.log(form);
    await this.map.setBalloonContent(form.innerHTML);
  }

  onDocumentClick(e) {
    if (e.target.dataset.role==='review-add'){
      const reviewForm=document.querySelector('#review-form');
      const coords=JSON.parse(reviewForm.dataset.coords);
      const data={
        coords,
        review: {
          name: document.querySelector('[data-role=review-name]').value,
          place: document.querySelector('[data-role=review-place]').value,
          text: document.querySelector('[data-role=review-text]').value,
        },
      };
      this.storage.add(data);
      this.map.createPlacemark(coords);
      this.map.closeBalloon();
    }
  }

}
