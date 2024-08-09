import { FilterQuery, Query } from "mongoose";
import { unknown } from "zod";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObject = { ...this.query };
    const excludeFields = [
      "searchTerm",
      "sort",
      "limit",
      "page",
      "fields",
      "category",
    ];
    excludeFields.forEach((element) => delete queryObject[element]);
    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);
    return this;
  }
  category() {
    if (this.query.category) {
      const neWcategory = (this.query.category as string).split(",");
      this.modelQuery = this.modelQuery.find({
        category: { $in: neWcategory },
      });
    }
    return this;
  }
  sort() {
    const sort =
      (this.query.sort as string)?.split(",")?.join(" ") || "-createAT";
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  paginate() {
    console.log(this.query);
    const page = Number(this?.query?.page) || 0;
    const limit = Number(this?.query?.limit) || 0;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this.query.fields as string)?.split(",")?.join(" ") || "-__V";
    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }
}

export default QueryBuilder;
