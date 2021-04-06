export default class Storage {
  constructor (saveGeoReview){
    this.saveGeoReview=saveGeoReview;
  }

  getSave() {
    let save={};
    try {
      save=JSON.parse(localStorage[this.saveGeoReview]);
    } finally {
      return save;
    }
  }

  add(data) {
    const index=`${data.coords[0]}_${data.coords[1]}`;
    const save=this.getSave();
    save[index]=save[index] || [];
    save[index].push(data.review);
    localStorage[this.saveGeoReview]=JSON.stringify(save);
  }

  getByCoords(coords){
    const index=`${coords[0]}_${coords[1]}`;
    const save=this.getSave();
    return save[index] || [];
  }

  getCoords() {
    const coords=[];
    const save=this.getSave();
    for (const item in save){
      coords.push({
        coords: item.split('_'),
        total: save[item].length,
      })
    }
    return coords;
  }
}
