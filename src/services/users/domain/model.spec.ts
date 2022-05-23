import { User } from './model';
import 'dotenv/config';

describe('User 모델에 대한 테스트', () => {
  const mockUser = {
    token: 'github Token',
    githubId: 'githubId',
    imgUrl: 'imgUrl',
    stackList: ['Array to stringify'],
    userInfo: 'this is intro',
    position: 'position',
  };
  const user = User.create(mockUser);

  describe('새로운 User 객체를 생성하는 테스트', () => {
    it('성공적으로 User 객체를 생셩하는 경우, 생성된 User 객체를 반환한다.', () => {
      expect(() => User.create(mockUser)).not.toThrow();
    });

    it('create 의 args가 없으면 에러를 발생시킨다.', () => {
      expect(() => User.create(undefined)).toThrow('unexpected Error');
    });
  });

  describe('로그인 시 token을 발급해주는 테스트', () => {
    it('정상적으로 로그인에 성공했을 경우, token을 발급해준다.', () => {
      const mockDate = jest.spyOn(Date, 'now').mockImplementation(() => 123456789);
      expect(user.createToken()).toBe(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnaXRodWJJZCI6ImdpdGh1YklkIiwiaWF0IjoxMjM0NTZ9.5VDtPDe48YwIsgyV8kEcEVhQD5ZXTtct-GsRM6NmBzM'
      );
      mockDate.mockClear();
    });
  });
});
