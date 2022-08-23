import { json, JSONValue, log, near } from "@graphprotocol/graph-ts";
import { Token, User } from "../../generated/schema";

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

  if (functionCall.methodName == "nft_mint") {
    if (outcome.logs[0] != null) {
      // grab the event log and parse into an object
      const parsed = outcome.logs[0].toString().replace("EVENT_JSON:", "");
      log.info("outcomeLog {}", [parsed]);
      const jsonData = json.try_fromString(parsed);
      const jsonObject = jsonData.value.toObject();

      const eventData = jsonObject.get("data");
      if (eventData) {
        const eventArray: JSONValue[] = eventData.toArray();
        // extract L1 data
        const data = eventArray[0].toObject();
        const tokenIds = data.get("token_ids");
        const ownerId = data.get("owner_id");

        if (!tokenIds || !ownerId) return;

        const ids: JSONValue[] = tokenIds.toArray();
        const tokenId = ids[0].toString();

        let token = new Token(tokenId);

        token.tokenId = tokenId.toString();

        token.ownerId = ownerId.toString();
        token.owner = ownerId.toString();

        let user = User.load(ownerId.toString());
        if (!user) {
          user = new User(ownerId.toString());
        }

        token.save();
        user.save();
      }
    }
  }
}
