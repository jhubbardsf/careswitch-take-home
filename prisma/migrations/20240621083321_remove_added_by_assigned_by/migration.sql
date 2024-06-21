/*
  Warnings:

  - You are about to drop the column `assignedBy` on the `WorkspaceToUser` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WorkspaceToUser" (
    "userId" TEXT NOT NULL,
    "workspaceId" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId", "workspaceId"),
    CONSTRAINT "WorkspaceToUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WorkspaceToUser_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WorkspaceToUser" ("assignedAt", "userId", "workspaceId") SELECT "assignedAt", "userId", "workspaceId" FROM "WorkspaceToUser";
DROP TABLE "WorkspaceToUser";
ALTER TABLE "new_WorkspaceToUser" RENAME TO "WorkspaceToUser";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
