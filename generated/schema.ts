// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save User entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("owner", Value.fromString(""));
    this.set("ownerId", Value.fromString(""));
    this.set("creator", Value.fromString(""));
    this.set("creatorId", Value.fromString(""));
    this.set("tokenId", Value.fromString(""));
    this.set("rootId", Value.fromString(""));
    this.set("root", Value.fromString(""));
    this.set("type", Value.fromString(""));
    this.set("image", Value.fromString(""));
    this.set("metadata", Value.fromString(""));
    this.set("status", Value.fromString(""));
    this.set("category", Value.fromString(""));
    this.set("labels", Value.fromStringArray(new Array(0)));
    this.set("pendingOrders", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Token entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Token entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Token", id.toString(), this);
    }
  }

  static load(id: string): Token | null {
    return changetype<Token | null>(store.get("Token", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get ownerId(): string {
    let value = this.get("ownerId");
    return value!.toString();
  }

  set ownerId(value: string) {
    this.set("ownerId", Value.fromString(value));
  }

  get creator(): string {
    let value = this.get("creator");
    return value!.toString();
  }

  set creator(value: string) {
    this.set("creator", Value.fromString(value));
  }

  get creatorId(): string {
    let value = this.get("creatorId");
    return value!.toString();
  }

  set creatorId(value: string) {
    this.set("creatorId", Value.fromString(value));
  }

  get tokenId(): string {
    let value = this.get("tokenId");
    return value!.toString();
  }

  set tokenId(value: string) {
    this.set("tokenId", Value.fromString(value));
  }

  get rootId(): string {
    let value = this.get("rootId");
    return value!.toString();
  }

  set rootId(value: string) {
    this.set("rootId", Value.fromString(value));
  }

  get root(): string {
    let value = this.get("root");
    return value!.toString();
  }

  set root(value: string) {
    this.set("root", Value.fromString(value));
  }

  get type(): string {
    let value = this.get("type");
    return value!.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get image(): string {
    let value = this.get("image");
    return value!.toString();
  }

  set image(value: string) {
    this.set("image", Value.fromString(value));
  }

  get metadata(): string {
    let value = this.get("metadata");
    return value!.toString();
  }

  set metadata(value: string) {
    this.set("metadata", Value.fromString(value));
  }

  get status(): string {
    let value = this.get("status");
    return value!.toString();
  }

  set status(value: string) {
    this.set("status", Value.fromString(value));
  }

  get category(): string {
    let value = this.get("category");
    return value!.toString();
  }

  set category(value: string) {
    this.set("category", Value.fromString(value));
  }

  get labels(): Array<string> {
    let value = this.get("labels");
    return value!.toStringArray();
  }

  set labels(value: Array<string>) {
    this.set("labels", Value.fromStringArray(value));
  }

  get pendingOrders(): Array<string> {
    let value = this.get("pendingOrders");
    return value!.toStringArray();
  }

  set pendingOrders(value: Array<string>) {
    this.set("pendingOrders", Value.fromStringArray(value));
  }
}

export class Order extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("orderId", Value.fromString(""));
    this.set("tokenId", Value.fromString(""));
    this.set("token", Value.fromString(""));
    this.set("requester", Value.fromString(""));
    this.set("requesterId", Value.fromString(""));
    this.set("requestee", Value.fromString(""));
    this.set("requesteeId", Value.fromString(""));
    this.set("status", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Order entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Order entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Order", id.toString(), this);
    }
  }

  static load(id: string): Order | null {
    return changetype<Order | null>(store.get("Order", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get orderId(): string {
    let value = this.get("orderId");
    return value!.toString();
  }

  set orderId(value: string) {
    this.set("orderId", Value.fromString(value));
  }

  get tokenId(): string {
    let value = this.get("tokenId");
    return value!.toString();
  }

  set tokenId(value: string) {
    this.set("tokenId", Value.fromString(value));
  }

  get token(): string {
    let value = this.get("token");
    return value!.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get requester(): string {
    let value = this.get("requester");
    return value!.toString();
  }

  set requester(value: string) {
    this.set("requester", Value.fromString(value));
  }

  get requesterId(): string {
    let value = this.get("requesterId");
    return value!.toString();
  }

  set requesterId(value: string) {
    this.set("requesterId", Value.fromString(value));
  }

  get requestee(): string {
    let value = this.get("requestee");
    return value!.toString();
  }

  set requestee(value: string) {
    this.set("requestee", Value.fromString(value));
  }

  get requesteeId(): string {
    let value = this.get("requesteeId");
    return value!.toString();
  }

  set requesteeId(value: string) {
    this.set("requesteeId", Value.fromString(value));
  }

  get status(): string {
    let value = this.get("status");
    return value!.toString();
  }

  set status(value: string) {
    this.set("status", Value.fromString(value));
  }
}
