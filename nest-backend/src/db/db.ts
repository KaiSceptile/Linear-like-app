import {Module} from "@nestjs/common"
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { WorkspacesController } from "./workspaces/workspaces.controller";
import { WorkspacesService } from "./workspaces/workspaces.service";

@Module({
    controllers: [UsersController, WorkspacesController],
    providers: [UsersService, WorkspacesService]
})
export class DBModule {}
