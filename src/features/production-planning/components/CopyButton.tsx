import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
export function CopyButton({ onCopy }: { onCopy?:()=>void }) { return <button title="Copy plan" onClick={()=>{onCopy?.();toast.success('Plan copied');}} className="rounded-lg p-1.5 hover:bg-slate-100"><DocumentDuplicateIcon className="h-4 w-4 text-slate-400" /></button>; }
