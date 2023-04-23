import { useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import dynamic from "next/dynamic";
import Layout from "@/components/base/Layout/Layout";

const DisableSsrEditor = dynamic(() => import('../../../features/markdown/components/TuiEditor'), {
    ssr: false,
})

type FormData = {
    title: string;
}

const NewPost = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    const ref = useRef<any>(null)

    const handleBack = useCallback(() => {
        router.back()
    }, [router])

    return (
        <>
            <Layout className="h-screen w-full overflow-hidden">
                <form
                    className="h-screen w-full"
                    onSubmit={handleSubmit(async (data) => {
                        try {
                            const editorInstance = ref?.current.getInstance();

                            // 作成した内容をMarkdown形式で保存
                            const content = editorInstance.getMarkdown();

                            if (content == "") {
                                throw new Error("記事が書かれていません。")
                            }

                            toast.success("記事の作成に成功しました！")

                            router.replace('/');
                        } catch (e) {
                            console.error(e);
                            toast.error(`${e}` || 'もう一度お試しください。');
                        }
                    })}
                >
                    <div>
                        <label htmlFor="title" className="text-sm leading-7 text-gray-600">
                            タイトル
                            <span className="ml-2 text-xs text-red-500">
                                {errors.title?.message}
                            </span>
                        </label>
                        <input
                            {...register('title', {
                                required: 'タイトルを記入してください。',
                            })}
                            id="title"
                            type="text"
                            name="title"
                            placeholder="記事名"
                            className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out placeholder:text-sm"
                        />
                    </div>

                    <DisableSsrEditor content="" editorRef={ref} />

                    <div className="fixed bottom-0 flex h-12 w-full lg:h-14">
                        <button onClick={handleBack} className="h-full w-[40%] bg-gray-500 text-sm font-medium text-white hover:bg-gray-700 md:text-base lg:text-base">
                            戻る
                        </button>
                        <button type="submit" className="h-full w-full bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 md:text-base lg:text-base">
                            作成
                        </button>
                    </div>
                </form>
            </Layout>
        </>
    )
}

export default NewPost