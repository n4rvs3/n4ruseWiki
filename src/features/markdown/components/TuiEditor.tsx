import '@toast-ui/editor/dist/i18n/ja-jp'
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'prismjs/themes/prism.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Prism from 'prismjs';

interface Props {
    content: string;
    editorRef: React.MutableRefObject<any>;
}

const TuiEditor = ({ content = '', editorRef }: Props) => {
    const toolbarItems = [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr'],
        ['ul', 'ol', 'task'],
        ['table', 'link'],
        ['image'],
        ['code'],
        ['scrollSync'],
    ];

    return (
        <>
            {editorRef && (
                <Editor
                    ref={editorRef}
                    initialValue={content || ' '}
                    initialEditType="markdown"
                    previewStyle={window.innerWidth > 1000 ? 'vertical' : 'tab'}
                    hideModeSwitch={true}
                    height="calc(100% - 5rem)"
                    theme={'dark'}
                    usageStatistics={false}
                    toolbarItems={toolbarItems}
                    useCommandShortcut={true}
                    plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
                    language='ja'
                />
            )}
        </>
    );
};

export default TuiEditor;