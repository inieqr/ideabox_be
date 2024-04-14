"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmInternalModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_service_1 = require("./typeorm.service");
let TypeOrmInternalModule = class TypeOrmInternalModule {
};
exports.TypeOrmInternalModule = TypeOrmInternalModule;
exports.TypeOrmInternalModule = TypeOrmInternalModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [typeorm_service_1.TypeOrmService]
    })
], TypeOrmInternalModule);
//# sourceMappingURL=typeorm.module.js.map