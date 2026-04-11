import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

/* ================= DATA ================= */
const STAGES = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];

const initialData = {
  New: [
    { id: "1", name: "Ali", company: "Tech Corp", value: "$5k" },
    { id: "2", name: "Ahmed", company: "Startup Inc", value: "$2k" },
  ],
  Contacted: [{ id: "3", name: "Sara", company: "Agency X", value: "$3k" }],
  Qualified: [{ id: "4", name: "Usman", company: "Solutions Ltd", value: "$7k" }],
  Proposal: [{ id: "5", name: "Client X", company: "Enterprise", value: "$10k" }],
  Won: [{ id: "6", name: "Company A", company: "Global Co", value: "$15k" }],
  Lost: [{ id: "7", name: "Client B", company: "Local Biz", value: "$1k" }],
};

const COLORS = {
  New: "bg-blue-500/20 text-blue-400",
  Contacted: "bg-purple-500/20 text-purple-400",
  Qualified: "bg-yellow-500/20 text-yellow-400",
  Proposal: "bg-orange-500/20 text-orange-400",
  Won: "bg-green-500/20 text-green-400",
  Lost: "bg-red-500/20 text-red-400",
};

/* ================= COMPONENT ================= */
const PipelineBoard = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const sourceItems = [...data[sourceCol]];
    const destItems = [...data[destCol]];

    const [movedItem] = sourceItems.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceItems.splice(destination.index, 0, movedItem);
      setData({ ...data, [sourceCol]: sourceItems });
    } else {
      destItems.splice(destination.index, 0, movedItem);
      setData({
        ...data,
        [sourceCol]: sourceItems,
        [destCol]: destItems,
      });
    }
  };

  return (
    <div className="bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-200">Sales Pipeline</h2>
        <span className="text-xs text-gray-400">Drag & drop leads</span>
      </div>

      {/* BOARD */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-5 pb-3 overflow-x-auto no-scrollbar">
          {STAGES.map((stage) => (
            <Droppable droppableId={stage} key={stage}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`
                    min-w-60  shrink-0 rounded-xl p-3
                    transition-all duration-200
                    ${snapshot.isDraggingOver ? "bg-white/5" : "bg-[#020617]/60"}
                  `}
                >
                  {/* STAGE HEADER */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-300">{stage}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${COLORS[stage]}`}>
                      {data[stage].length}
                    </span>
                  </div>

                  {/* CARDS */}
                  <div className="space-y-3 min-h-25 ">
                    {data[stage].length === 0 && (
                      <p className="mt-4 text-xs text-center text-gray-500">No leads</p>
                    )}

                    {data[stage].map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`
                              p-3 rounded-lg border border-white/10
                              bg-[#0B0F19] transition-all duration-200
                              cursor-grab
                              hover:border-indigo-500/40 hover:shadow-lg
                              ${snapshot.isDragging ? "scale-105 rotate-1 shadow-xl" : ""}
                            `}
                          >
                            <p className="text-sm font-medium text-gray-200">{item.name}</p>
                            <p className="mt-1 text-xs text-gray-400">{item.company}</p>
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-xs text-green-400">{item.value}</span>
                              <span className="text-xs text-indigo-400">🔥 70%</span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default PipelineBoard;