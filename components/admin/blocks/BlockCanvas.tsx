'use client';

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { BlockData, BlockType } from '@/types/blog';
import BlockItem from './BlockItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faParagraph, faHeading, faImage, faListUl, faQuoteRight, faCode, faMinus, faExternalLinkAlt, faVideo, faLink, faInfoCircle, faThumbsUp, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { SuggestionTool } from '@/lib/linkSuggestions';

interface Props {
    blocks: BlockData[];
    onChange: (blocks: BlockData[]) => void;
    uploadHandler: (file: File) => Promise<string>;
    tools?: SuggestionTool[];
}

export default function BlockCanvas({ blocks, onChange, uploadHandler, tools }: Props) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = blocks.findIndex(b => b.id === active.id);
            const newIndex = blocks.findIndex(b => b.id === over.id);
            onChange(arrayMove(blocks, oldIndex, newIndex));
        }
    };

    const updateBlock = (id: string, newData: BlockData) => {
        onChange(blocks.map(b => b.id === id ? newData : b));
    };

    const deleteBlock = (id: string) => {
        if (blocks.length === 1 && !blocks[0].content) return; // Prevent deleting last empty block
        onChange(blocks.filter(b => b.id !== id));
    };

    const addBlock = (afterId?: string, type: BlockType = 'paragraph') => {
        const newBlock: BlockData = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            content: '',
            level: 2
        };

        if (afterId) {
            const index = blocks.findIndex(b => b.id === afterId);
            const newBlocks = [...blocks];
            newBlocks.splice(index + 1, 0, newBlock);
            onChange(newBlocks);
        } else {
            onChange([...blocks, newBlock]);
        }
    };

    return (
        <div className="max-w-3xl mx-auto pb-40">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                    {blocks.map(block => (
                        <BlockItem
                            key={block.id}
                            block={block}
                            onChange={(b: BlockData) => updateBlock(block.id, b)}
                            onDelete={() => deleteBlock(block.id)}
                            onEnter={() => addBlock(block.id, 'paragraph')}
                            uploadHandler={uploadHandler}
                            tools={tools}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            {/* Magic Add Bar */}
            <div className="mt-8 p-6 border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center gap-6 hover:border-blue-200 transition-colors group bg-gray-50/30">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Add Block</span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {/* Basic & Text */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 pl-1 uppercase">📝 Text & Basic</h4>
                        <div className="flex flex-wrap gap-2">
                            <AddButton icon={faParagraph} label="Text" onClick={() => addBlock(undefined, 'paragraph')} />
                            <AddButton icon={faHeading} label="Heading" onClick={() => addBlock(undefined, 'heading')} />
                            <AddButton icon={faListUl} label="List" onClick={() => addBlock(undefined, 'list')} />
                            <AddButton icon={faQuoteRight} label="Quote" onClick={() => addBlock(undefined, 'quote')} />
                            <AddButton icon={faCode} label="Code" onClick={() => addBlock(undefined, 'code')} />
                            <AddButton icon={faMinus} label="Divider" onClick={() => addBlock(undefined, 'divider')} />
                            <AddButton icon={faInfoCircle} label="Callout" onClick={() => addBlock(undefined, 'callout')} />
                        </div>
                    </div>

                    {/* Media */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 pl-1 uppercase">🖼️ Media</h4>
                        <div className="flex flex-wrap gap-2">
                            <AddButton icon={faImage} label="Image" onClick={() => addBlock(undefined, 'image')} />
                            <AddButton icon={faVideo} label="Video" onClick={() => addBlock(undefined, 'video')} />
                        </div>
                    </div>

                    {/* External & Conversion */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 pl-1 uppercase">🔗 Conversion & Navigation</h4>
                        <div className="flex flex-wrap gap-2">
                            <AddButton icon={faLink} label="Link Card" onClick={() => addBlock(undefined, 'link_card')} />
                            <AddButton icon={faExternalLinkAlt} label="CTA Button" onClick={() => addBlock(undefined, 'cta')} />
                            <AddButton icon={faThumbsUp} label="Pros/Cons" onClick={() => addBlock(undefined, 'pros_cons')} />
                            <AddButton icon={faListAlt} label="Table of Contents" onClick={() => addBlock(undefined, 'toc')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AddButton({ icon, label, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 shadow-sm rounded-lg hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all font-bold text-gray-600 text-xs w-auto whitespace-nowrap"
        >
            <FontAwesomeIcon icon={icon} /> {label}
        </button>
    );

}
