import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: '64a7b73a413b34bd12287410',
      user: '64a6c2def35462a49a2be737',
      title: 'note1',
      description: 'note1',
      tag: 'General',
      date: '2023-07-07T06:56:58.096Z',
      __v: 0,
    },
    {
      _id: '64aa410ce5ebf7dd120f82b713313',
      user: '64a6c2def35462a49a2be737',
      title: 'note2',
      description: 'note2',
      tag: 'personal',
      date: '2023-07-09T05:09:32.761Z',
      __v: 0,
    },
    {
      _id: '64a7b73a413b34bd12287410243',
      user: '64a6c2def35462a49a2be737',
      title: 'note1',
      description: 'note1',
      tag: 'General',
      date: '2023-07-07T06:56:58.096Z',
      __v: 0,
    },
    {
      _id: '64aa410ce5ebf7dd120f82b324237',
      user: '64a6c2def35462a49a2be737',
      title: 'note2',
      description: 'note2',
      tag: 'personal',
      date: '2023-07-09T05:09:32.761Z',
      __v: 0,
    },
    {
      _id: '64a7b73a413b34bd12224387410',
      user: '64a6c2def35462a49a2be737',
      title: 'note1',
      description: 'note1',
      tag: 'General',
      date: '2023-07-07T06:56:58.096Z',
      __v: 0,
    },
    {
      _id: '64aa410ce5ebf7dd120f23482b7',
      user: '64a6c2def35462a49a2be737',
      title: 'note2',
      description: 'note2',
      tag: 'personal',
      date: '2023-07-09T05:09:32.761Z',
      __v: 0,
    },
    {
      _id: '64a7b73a413b34bd1223434287410',
      user: '64a6c2def35462a49a2be737',
      title: 'note1',
      description: 'note1',
      tag: 'General',
      date: '2023-07-07T06:56:58.096Z',
      __v: 0,
    },
    {
      _id: '64aa410ce5eb3433f7dd120f82b7',
      user: '64a6c2def35462a49a2be737',
      title: 'note2',
      description: 'note2',
      tag: 'personal',
      date: '2023-07-09T05:09:32.761Z',
      __v: 0,
    },
  ];

  const [notes, setnotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setnotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
