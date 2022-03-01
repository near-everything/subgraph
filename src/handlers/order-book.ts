import { near, JSONValue, json, ipfs, log } from "@graphprotocol/graph-ts";
import { User, Order, Token } from "../../generated/schema";

export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  const actions = receipt.receipt.actions;

  for (let i = 0; i < actions.length; i++) {
    handleAction(
      actions[i],
      receipt.receipt,
      receipt.block.header,
      receipt.outcome
    );
  }
}

function handleAction(
  action: near.ActionValue,
  receipt: near.ActionReceipt,
  blockHeader: near.BlockHeader,
  outcome: near.ExecutionOutcome
): void {
  if (action.kind != near.ActionKind.FUNCTION_CALL) {
    log.info("Early return: {}", ["Not a function call"]);
    return;
  }

  const functionCall = action.toFunctionCall();

  // change the methodName here to the methodName emitting the log in the contract
  if (functionCall.methodName == "distributor_req_pile_from_producer") {
    if (outcome.logs[0] != null) {
      // grab the event log and parse into an object
      const parsed = outcome.logs[0].toString().replace("EVENT_JSON:", "");
      log.info("outcomeLog {}", [parsed]);
      const jsonData = json.try_fromString(parsed);
      const jsonObject = jsonData.value.toObject();

      const eventData = jsonObject.get("data");
      if (eventData) {
        const eventArray: JSONValue[] = eventData.toArray();

        const data = eventArray[0].toObject();
        const status = data.get("status");
        let orderId = data.get("order_id");
        let tokenId = data.get("token_id");
        if (!orderId || !tokenId) return;

        let requesterId = data.get("requester_id");
        let requesteeId = data.get("requestee_id");

        let order = new Order(orderId.toString());
        if (order) {
          order.orderId = orderId.toString();
          order.tokenId = tokenId.toString();
          order.token = tokenId.toString();
          if (requesterId) {
            order.requesterId = requesterId.toString();
            order.requester = requesterId.toString();
            let requester = User.load(requesterId.toString());
            if (!requester) {
              requester = new User(requesterId.toString());
            }
            requester.save();
          }
          if (requesteeId) {
            order.requesteeId = requesteeId.toString();
            order.requestee = requesteeId.toString();
            let requestee = User.load(requesteeId.toString());
            if (!requestee) {
              requestee = new User(requesteeId.toString());
            }
            requestee.save();
          }

          let token = Token.load(tokenId.toString());
          if (token && status) {
            order.status = status.toString();
            token.status = status.toString();


            if (!token.pendingOrders) {
              token.pendingOrders = [tokenId.toString()];
            } else {
              (token.pendingOrders as string[]).push(tokenId.toString());
            }
            token.save();
          }
          order.save();
        }
      }
    }
  }
  if (
    functionCall.methodName == "producer_acc_req_from_distributor" ||
    functionCall.methodName == "transporter_acc_transfer_req"
  ) {
    if (outcome.logs[0] != null) {
      // grab the event log and parse into an object
      const parsed = outcome.logs[0].toString().replace("EVENT_JSON:", "");
      log.info("outcomeLog {}", [parsed]);
      const jsonData = json.try_fromString(parsed);
      const jsonObject = jsonData.value.toObject();

      const eventData = jsonObject.get("data");
      if (eventData) {
        const eventArray: JSONValue[] = eventData.toArray();

        const data = eventArray[0].toObject();
        const status = data.get("status");
        let orderId = data.get("order_id");
        let tokenId = data.get("token_id");
        if (!orderId || !tokenId) return;

        let order = Order.load(orderId.toString());
        if (order) {
          let token = Token.load(tokenId.toString());
          if (token && status) {
            order.status = status.toString();
            token.status = status.toString();
            token.save();
          }
          order.save();
        }
      }
    }
  }
  if (functionCall.methodName == "distributor_complete_order") {
    if (outcome.logs[0] != null) {
      // grab the event log and parse into an object
      const parsed = outcome.logs[0].toString().replace("EVENT_JSON:", "");
      log.info("outcomeLog {}", [parsed]);
      const jsonData = json.try_fromString(parsed);
      const jsonObject = jsonData.value.toObject();

      const eventData = jsonObject.get("data");
      if (eventData) {
        const eventArray: JSONValue[] = eventData.toArray();

        const data = eventArray[0].toObject();
        const status = data.get("status");
        let orderId = data.get("order_id");
        let tokenId = data.get("token_id");
        if (!orderId || !tokenId) return;

        let order = Order.load(orderId.toString());
        if (order) {
          let token = Token.load(tokenId.toString());
          if (token && status) {
            order.status = status.toString();
            token.status = status.toString();
            // Clear pending orders
            token.pendingOrders = [];
            token.save();
          }
          order.save();
        }
      }
    }
  }
}
