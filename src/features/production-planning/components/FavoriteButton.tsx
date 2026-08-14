import { StarIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
export function FavoriteButton() { const [on,setOn]=useState(false); return <button title={on?'Remove favorite':'Add favorite'} onClick={()=>setOn(v=>!v)} className="rounded-lg p-1.5 hover:bg-slate-100"><StarIcon className={`h-4 w-4 ${on?'fill-orange-400 text-orange-400':'text-slate-400'}`} /></button>; }
