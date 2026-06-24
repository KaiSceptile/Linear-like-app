import {Module} from "@nestjs/common"
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { WorkspacesController } from "./workspaces/workspaces.controller";
import { WorkspacesService } from "./workspaces/workspaces.service";
import { BoardsService } from "./boards/boards.service";
import { BoardsController } from "./boards/boards.controller";

@Module({
    controllers: [UsersController, WorkspacesController, BoardsController],
    providers: [UsersService, WorkspacesService, BoardsService]
})
export class DBModule {}
