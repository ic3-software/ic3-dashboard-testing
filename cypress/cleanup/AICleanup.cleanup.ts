import {aiDeleteAllConversations} from "../integration/AI/utils";

/**
 * Not a test : deletes the AI conversations of the test user before a run (see cypressDaily.yml : cleanup step,
 * cypressDailySplit.yml : cleanup job).
 *
 * Run once, before the shards start (they share the same user and server) : deleting them at the end of a spec might
 * delete the conversations of another spec running at the same time in another shard.
 *
 * Not matched by the specPattern of the configs (*.spec.ts), run it explicitly :
 *
 *      npx cypress run --config specPattern=cypress/cleanup/*.cleanup.ts
 */
describe("Cleanup", () => {

    it("AI : delete all the dashboard editor conversations", () => {

        aiDeleteAllConversations();

    });

});
