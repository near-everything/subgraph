import { near, JSONValue, json, ipfs, log } from "@graphprotocol/graph-ts";
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
    // item (NFT) has been minted on common good
    // we need to reflect that here to be easily queryable
    // but we will not expose the owner or any fine details

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
        const tokenIds = data.get("token_ids");
        const ownerId = data.get("owner_id");
        const rootId = data.get("root_id");
        const metadata = data.get("metadata");
        const description = data.get("description");
        if (!tokenIds || !ownerId) return;

        log.debug("parsed event data", []);

        const ids: JSONValue[] = tokenIds.toArray();
        const tokenId = ids[0].toString();

        let token = new Token(tokenId);

        token.tokenId = tokenId.toString();
        if (rootId) {
          token.rootId = rootId.toString();
          token.root = rootId.toString();
          if (rootId.toString() == tokenId.toString()) {
            token.status = "NEW";
            token.type = "pile";
          } else {
            token.status = "NEEDS_LABELLING"
            token.type = "item";
          }
        }
        token.category = "uncategorized";
        token.labels = ["unlabelled"];
        log.debug("populated token status and base data", []);

        token.ownerId = ownerId.toString();
        token.owner = ownerId.toString();

        token.creatorId = ownerId.toString();
        token.creator = ownerId.toString();

        log.debug("populated owner and creator ids", []);
        // this breaks if metadata or description are null
        if (metadata && description) {
          token.image = metadata.toString();
          token.metadata = description.toString();
        }
        log.debug("populated token data", []);

        let user = User.load(ownerId.toString());
        if (!user) {
          user = new User(ownerId.toString());
        }

        log.debug("created user", []);

        token.save();
        user.save();
      }
    }
  } 
  else if (functionCall.methodName == "nft_update") {
    // item (NFT) has been updated by an organizer
    // we need to reflect those changes here

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
        const tokenIds = data.get("token_ids");
        const category = data.get("category");
        const labels = data.get("labels");
        if (!tokenIds) return;

        const ids: JSONValue[] = tokenIds.toArray();
        const tokenId = ids[0].toString();

        let token = Token.load(tokenId);
        if (!token) return;

        if (category) {
          token.category = category.toString();
        }

        if (labels) {
          const lbls: JSONValue[] = labels.toArray();
          token.labels = lbls.map<string>((data: JSONValue) => data.toString());
        }
        token.save();
      }
    }
  }
}
