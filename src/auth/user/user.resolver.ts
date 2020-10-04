/* import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { UpdateUserInput } from './users.input'
import { User } from './user.entity'
import { UsersService } from './users.service'

@Resolver(User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async allUsers(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Query(() => User)
  async User(@Args('id') id: string): Promise<User> {
    return this.usersService.findOne(id)
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput
  ): Promise<User> {
    return this.usersService.update(id, input)
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string): Promise<User> {
    return this.usersService.delete(id)
  }
}
*/
