export class AppStoreListItemClass {
  constructor(
    title,
    subTitle,
    imageUri,
    rating,
    rateNumber,
    key,
    author,
    summary,
  ) {
    this._title = title;
    this._subTitle = subTitle;
    this._imageUri = imageUri;
    this._rating = rating;
    this._rateNumber = rateNumber;
    this._key = key;
    this._author = author;
    this._summary = summary;
  }

  get title() {
    return this._title;
  }

  get subTitle() {
    return this._subTitle;
  }

  get imageUri() {
    return this._imageUri;
  }

  get rating() {
    return this._rating;
  }

  get rateNumber() {
    return this._rateNumber;
  }

  get key() {
    return this._key;
  }

  get summary() {
    return this._summary;
  }

  get author() {
    return this._author;
  }

  // combine text on create to prevent future extra calcuation during filter

  get combinedText() {
    return `${this._title}${this._summary}${this._subTitle}${this._author}`.toUpperCase();
  }
}
