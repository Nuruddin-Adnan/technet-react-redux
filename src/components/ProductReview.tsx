import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { FormEvent, useState } from 'react';
import { useGetCommentQuery, usePostCommentMutation } from '@/redux/features/product/productApi';

interface iProps {
  id: string;
}

export default function ProductReview({id}: iProps) {
  const [inputValue, setInputValue] = useState<string>('');
  // const [postComment, {isLoading, isError, isSuccess}] = usePostCommentMutation();
  const [postComment] = usePostCommentMutation();
  const {data} = useGetCommentQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 3000
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const options = {
      id: id,
      data: {comment: inputValue}
    }

    console.log(options);
    
    postComment(options);
    setInputValue('');
  }
  
  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea className="min-h-[30px]" onChange={(e)=> setInputValue(e.target.value)} value={inputValue} />
        <Button type='submit' className="rounded-full h-10 w-10 p-2 text-[25px]">
          <FiSend />
        </Button>
      </form>
      <div className="mt-10">
        {data?.comments?.map((comment: string, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
