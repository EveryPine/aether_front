import TaskTitle from '../TaskTitle'
import TaskDivider from '../TaskDivider'
import Search from './Search'
import CommentList from './CommentList'
import CommentInput from './CommentInput'

function MainContent() {
  return (
    <main>  
      {/* 업무 이름 */}
      <TaskTitle />
      <h4 className="absolute h-[28px] left-[128px] top-[174px] text-[#4f5462] text-xl font-semibold leading-7">
            코멘트
      </h4>
      {/* 서치 탭 */}
      <Search />
      <TaskDivider />
      {/* 코멘트 내용 */}
      <CommentList />
      {/* 코멘트 입력 */}
      <CommentInput />
    </main>
  )
}

export default MainContent
