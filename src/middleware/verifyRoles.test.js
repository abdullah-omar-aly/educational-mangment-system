import  { isAllowedUser } from "./verifyRoles"
import { UserRoles } from "../schema/user"

describe('test isAllowedUser function' , () => {
    test("Basic user can not access admin routes" , () => {
        const userRoles = [UserRoles.BASIC]
        const allowedRoles = [UserRoles.ADMIN]
        const result = isAllowedUser( allowedRoles, userRoles)
        expect(result).toBe(false)
    })
    test('basic user can access basic routes' , () => {
        const userRoles = [UserRoles.BASIC ]
        const allowedRoles = [UserRoles.BASIC]
        const result = isAllowedUser( allowedRoles, userRoles)
        expect(result).toBe(true)
    })
    test("admin can access private admin routes'" , () => {
        const userRoles = [UserRoles.BASIC , UserRoles.ADMIN]
        const allowedRoles = [UserRoles.ADMIN]
        const result = isAllowedUser( allowedRoles, userRoles)
        expect(result).toBe(true)
    })
})
